import React from 'react';

const SearchHeader = ({ value, onChange, resultCount, onRandom }) => {
    return (
        <header className="search-header">
            <div className="brand-title" style={{ fontFamily: '"Ma Shan Zheng", cursive' }}>
                <span className="gradient-text">同福客栈</span> · 电子相册
            </div>
            <div className="search-container" style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="搜索台词，例如：照顾好我七舅姥爷..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    autoFocus
                />
                <button
                    className="icon-button"
                    onClick={onRandom}
                    title="随机看一张"
                    style={{
                        padding: '0 1.5rem',
                        fontSize: '1.2rem',
                        borderRadius: '9999px',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap'
                    }}
                >
                    🎲 手气不错
                </button>
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {value ? `找到 ${resultCount} 个结果` : '输入台词开始搜索'}
            </div>
        </header>
    );
};

export default SearchHeader;
