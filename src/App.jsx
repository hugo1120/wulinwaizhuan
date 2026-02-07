import React, { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import SearchHeader from './components/SearchHeader';
import ImageGrid from './components/ImageGrid';
import ImageViewer from './components/ImageViewer';
import './index.css';
import './styles/components.css';

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load index on mount
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load index:", err);
        setLoading(false);
      });
  }, []);

  // Initialize Fuse instance
  const fuse = useMemo(() => {
    if (data.length === 0) return null;
    return new Fuse(data, {
      keys: ['t'],
      includeScore: true,
      threshold: 0.3, // 0.3 is a good balance for fuzzy matching
      ignoreLocation: true, // Search anywhere in the string
      minMatchCharLength: 1,
      shouldSort: true,
      useExtendedSearch: true
    });
  }, [data]);

  // Filter logic
  const results = useMemo(() => {
    if (!query.trim()) return [];

    // Check if fuse is ready
    if (fuse) {
      // Fuse search
      const fuseResults = fuse.search(query);
      // Increased limit to 1000 as requested to avoid hiding results
      return fuseResults.slice(0, 1000).map(result => result.item);
    }

    // Fallback if fuse not ready (shouldn't happen often)
    return data.filter(item => item.t.toLowerCase().includes(query.toLowerCase())).slice(0, 1000);

  }, [query, fuse, data]);

  return (
    <div className="app">
      <SearchHeader
        value={query}
        onChange={setQuery}
        resultCount={results.length}
      />

      {!query && !loading && (
        <div style={{ textAlign: 'center', marginTop: '20vh', opacity: 0.5 }}>
          <h2 className="gradient-text" style={{ fontSize: '2rem' }}>武林外传 · 台词检索</h2>
          <p>共收录 {data.length} 张剧照</p>
        </div>
      )}

      {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading database...</div>}

      <ImageGrid
        images={results}
        onImageClick={setSelectedImage}
      />

      {selectedImage && (
        <ImageViewer
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNavigate={(direction) => {
            const currentIndex = data.findIndex(item => item.p === selectedImage.p);
            if (currentIndex === -1) return;
            
            const nextIndex = currentIndex + direction;
            if (nextIndex >= 0 && nextIndex < data.length) {
              setSelectedImage(data[nextIndex]);
            }
          }}
        />
      )}
    </div>
  );
}

export default App;
