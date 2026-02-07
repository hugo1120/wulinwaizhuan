import React from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
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
        <div className="container" style={{ height: 'calc(100vh - 100px)' }}>
            <VirtuosoGrid
                style={{ height: '100%' }}
                totalCount={images.length}
                overscan={200}
                components={{
                    List: React.forwardRef(({ style, children, ...props }, ref) => (
                        <div
                            ref={ref}
                            {...props}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                gap: '24px',
                                padding: '24px 0',
                                ...style,
                            }}
                        >
                            {children}
                        </div>
                    )),
                    Item: ({ children, ...props }) => (
                        <div
                            {...props}
                            style={{
                                padding: 0,
                                margin: 0,
                                display: 'flex'
                            }}
                        >
                            {children}
                        </div>
                    )
                }}
                itemContent={(index) => {
                    const img = images[index];
                    return (
                        <motion.div
                            key={img.p}
                            className="image-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => onImageClick(img)}
                            style={{ width: '100%' }}
                        >
                            <img
                                src={`${config.IMAGE_BASE_URL}/${img.p}`}
                                alt={img.t}
                                loading="lazy"
                            />
                            <div className="image-info">
                                <div className="line-text gradient-text" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{img.t}</div>
                                <div className="meta-info">
                                    <span>第 {img.e} 集</span>
                                    <span>{Math.floor(img.s / 60)}:{(img.s % 60).toString().padStart(2, '0')}</span>
                                </div>
                            </div>
                        </motion.div>
                    );
                }}
            />
        </div>
    );
};

export default ImageGrid;
