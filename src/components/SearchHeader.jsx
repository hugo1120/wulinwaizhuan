import React from 'react';

const SearchHeader = ({ value, onChange, resultCount }) => {
    return (
        <header className="search-header">
            <div className="brand-title">
                <span className="gradient-text">同福客栈</span> · 电子相册
            </div>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="搜索台词，例如：照顾好我七舅姥爷..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    autoFocus
                />
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {value ? `找到 ${resultCount} 个结果` : '输入台词开始搜索'}
            </div>
        </header>
    );
};

export default SearchHeader;
