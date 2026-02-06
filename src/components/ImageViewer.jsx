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
                        <span className="gradient-text">{image.t}</span>
                        <div style={{ fontSize: '0.9rem', marginTop: '8px', color: '#94a3b8' }}>
                            第 {image.e} 集 · {Math.floor(image.s / 60)}:{(image.s % 60).toString().padStart(2, '0')}
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
