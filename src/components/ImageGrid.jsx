import React from 'react';
import { motion } from 'framer-motion';
import config from '../config';

const ImageGrid = ({ images, onImageClick }) => {
    if (images.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                未找到相关台词
            </div>
        );
    }

    return (
        <div className="container">
            <div className="image-grid">
                {images.map((img, index) => (
                    <motion.div
                        key={img.p}
                        className="image-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        onClick={() => onImageClick(img)}
                    >
                        <img
                            src={`${config.IMAGE_BASE_URL}/${img.p}`}
                            alt={img.t}
                            loading="lazy"
                        />
                        <div className="image-info">
                            <div className="line-text">{img.t}</div>
                            <div className="meta-info">
                                <span>第 {img.e} 集</span>
                                <span>{Math.floor(img.s / 60)}:{(img.s % 60).toString().padStart(2, '0')}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ImageGrid;
