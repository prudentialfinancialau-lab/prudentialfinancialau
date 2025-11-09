import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = '/api/admin';

export default function AdminPage() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));
  const [selectedTab, setSelectedTab] = useState('editor');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [editedContent, setEditedContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token && isAuthenticated) {
      loadContent('home');
      loadImages();
    } else if (!token) {
      // Clear authentication state if no token exists
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        loadContent('home');
        loadImages();
      } else {
        setMessage({ type: 'error', text: data.error || 'Login failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection error. Make sure the admin server is running on port 3001.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setContent(null);
    setEditedContent('');
  };

  const loadContent = async (page) => {
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/content/${page}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setContent(data);
        setEditedContent(JSON.stringify(data, null, 2));
        setSelectedPage(page);
      } else if (response.status === 401 || response.status === 400) {
        // Token is invalid, log out
        handleLogout();
        setMessage({ type: 'error', text: 'Session expired. Please login again.' });
      } else {
        setMessage({ type: 'error', text: 'Failed to load content' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error loading content: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const loadImages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/images`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const images = await response.json();
        setUploadedImages(images);
      } else if (response.status === 401 || response.status === 400) {
        // Token is invalid, will be handled by loadContent
        console.log('Auth failed for images');
      }
    } catch (err) {
      console.error('Error loading images:', err);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const parsedContent = JSON.parse(editedContent);
      const token = localStorage.getItem('adminToken');

      const response = await fetch(`${API_URL}/content/${selectedPage}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedContent),
      });

      if (response.ok) {
        const data = await response.json();
        setContent(data.content);
        setMessage({ type: 'success', text: 'Content saved successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to save content' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Invalid JSON format. Please check your content.' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: 'success', text: `Image uploaded! URL: ${data.url}` });
        loadImages();
        setTimeout(() => setMessage(null), 5000);
      } else {
        setMessage({ type: 'error', text: 'Failed to upload image' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error uploading image' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (filename) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/images/${filename}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Image deleted successfully!' });
        loadImages();
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to delete image' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error deleting image' });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setMessage({ type: 'success', text: `Copied: ${text}` });
    setTimeout(() => setMessage(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            {message && (
              <div className={`px-4 py-3 rounded ${message.type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'}`}>
                {message.text}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 text-white py-3 rounded-lg font-bold hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-sm text-gray-600 text-center mt-4">
              Default: admin / admin123
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Content Management System</h1>
          <div className="flex gap-4">
            <button onClick={() => navigate('/')} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
              View Site
            </button>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-4">
            <button onClick={() => setSelectedTab('editor')} className={`px-6 py-4 font-medium border-b-2 ${selectedTab === 'editor' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600'}`}>
              Content Editor
            </button>
            <button onClick={() => setSelectedTab('images')} className={`px-6 py-4 font-medium border-b-2 ${selectedTab === 'images' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600'}`}>
              Image Manager
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {message && (
          <div className={`mb-4 px-4 py-3 rounded ${message.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
            {message.text}
          </div>
        )}

        {selectedTab === 'editor' && (
          <>
            <div className="mb-6 bg-white p-6 rounded-lg shadow">
              <label className="block text-gray-700 font-bold mb-3">Select Page:</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['home', 'about', 'services', 'contact'].map((page) => (
                  <button key={page} onClick={() => loadContent(page)} className={`px-6 py-3 rounded-lg font-medium ${selectedPage === page ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {content && (
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Editing: {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}</h2>
                  <button onClick={handleSave} disabled={loading} className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-600 disabled:opacity-50">
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full h-96 p-4 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </>
        )}

        {selectedTab === 'images' && (
          <>
            <div className="mb-6 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Upload Image</h2>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Images</h2>
              {uploadedImages.length === 0 ? (
                <p className="text-gray-600">No images uploaded</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {uploadedImages.map((img) => (
                    <div key={img.filename} className="border rounded-lg p-4">
                      <img src={img.url} alt={img.filename} className="w-full h-48 object-cover rounded mb-3" />
                      <p className="text-sm truncate mb-2">{img.filename}</p>
                      <div className="flex gap-2">
                        <button onClick={() => copyToClipboard(img.url)} className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm">Copy URL</button>
                        <button onClick={() => handleDeleteImage(img.filename)} className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm">Delete</button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{img.url}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
