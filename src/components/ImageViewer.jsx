import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../config';

const ImageViewer = ({ image, onClose, onNavigate }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onNavigate(-1);
            if (e.key === 'ArrowRight') onNavigate(1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNavigate]);

    if (!image) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <div
                    className="nav-button nav-left"
                    onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(-1);
                    }}
                >
                    ‹
                </div>

                <motion.div
                    className="modal-content"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={`${config.IMAGE_BASE_URL}/${image.p}`}
                        alt={image.t}
                        className="modal-image"
                    />
                    <div className="modal-text">
                        <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{image.t}</span>
                        <div style={{ fontSize: '1rem', marginTop: '8px', color: '#94a3b8' }}>
                            第 {image.e} 集 · {Math.floor(image.s / 60)}:{(image.s % 60).toString().padStart(2, '0')}
                        </div>

                        <div className="action-bar" style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <button
                                className="action-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(image.t).then(() => alert('台词已复制！'));
                                }}
                            >
                                📋 复制台词
                            </button>
                            <button
                                className="action-btn"
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    try {
                                        const response = await fetch(`${config.IMAGE_BASE_URL}/${image.p}`);
                                        const blob = await response.blob();
                                        const url = window.URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `${image.t}.jpg`;
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                        window.URL.revokeObjectURL(url);
                                    } catch (err) {
                                        console.error('Download failed', err);
                                        alert('下载失败，请长按图片保存');
                                    }
                                }}
                            >
                                ⬇️ 下载图片
                            </button>
                        </div>
                    </div>
                </motion.div>

                <div
                    className="nav-button nav-right"
                    onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(1);
                    }}
                >
                    ›
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImageViewer;
