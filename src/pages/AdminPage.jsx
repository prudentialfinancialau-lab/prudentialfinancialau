import { useEffect, useState, useRef } from 'react';
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
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token && isAuthenticated) {
      loadContent('home');
      loadImages();
    } else if (!token) {
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
      setMessage({ type: 'error', text: 'Connection error. Please check the server.' });
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
      }
    } catch (err) {
      console.error('Error loading images:', err);
    }
  };

  const handleSave = async (updatedContent) => {
    setLoading(true);
    setMessage(null);

    try {
      const dataToSave = updatedContent || content;
      const token = localStorage.getItem('adminToken');

      const response = await fetch(`${API_URL}/content/${selectedPage}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        const data = await response.json();
        setContent(data.content);
        setEditedContent(JSON.stringify(data.content, null, 2));
        setMessage({
          type: 'success',
          text: '✅ Content saved successfully! Open the page in a new tab to see your changes.',
          showPreview: true
        });
        setTimeout(() => setMessage(null), 8000);
      } else {
        setMessage({ type: 'error', text: 'Failed to save content' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: '❌ Error saving content: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files) => {
    const file = files[0];

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload file
    setLoading(true);
    setMessage(null);
    setUploadProgress(0);

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
        setMessage({ type: 'success', text: `✅ Image uploaded! Click to copy URL: ${data.url}` });
        setUploadProgress(100);
        loadImages();
        setPreviewImage(null);
        setTimeout(() => {
          setMessage(null);
          setUploadProgress(0);
        }, 5000);
      } else {
        setMessage({ type: 'error', text: '❌ Failed to upload image' });
        setPreviewImage(null);
      }
    } catch (err) {
      setMessage({ type: 'error', text: '❌ Error uploading image' });
      setPreviewImage(null);
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
        setMessage({ type: 'success', text: '✅ Image deleted successfully!' });
        loadImages();
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: '❌ Failed to delete image' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: '❌ Error deleting image' });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setMessage({ type: 'success', text: `📋 Copied: ${text}` });
          setTimeout(() => setMessage(null), 2000);
        })
        .catch(() => {
          fallbackCopy(text);
        });
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text) => {
    // Fallback for non-HTTPS or older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      setMessage({ type: 'success', text: `📋 Copied: ${text}` });
      setTimeout(() => setMessage(null), 2000);
    } catch (err) {
      setMessage({ type: 'error', text: `❌ Failed to copy. Please copy manually: ${text}` });
      setTimeout(() => setMessage(null), 5000);
    }

    document.body.removeChild(textArea);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">Sign in to manage your content</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Enter password"
                  required
                />
              </div>

              {message && (
                <div className={`px-4 py-3 rounded-xl text-sm font-medium ${message.type === 'error' ? 'bg-red-50 border-2 border-red-200 text-red-700' : 'bg-green-50 border-2 border-green-200 text-green-700'}`}>
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-1">Content Management System</h1>
              <p className="text-emerald-100">Manage your website content with ease</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/')}
                className="bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-lg hover:bg-white/30 transition-all font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Site
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500/90 backdrop-blur-sm px-5 py-2.5 rounded-lg hover:bg-red-600 transition-all font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTab('editor')}
              className={`px-8 py-4 font-semibold border-b-4 transition-all ${selectedTab === 'editor' ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Content Editor
              </span>
            </button>
            <button
              onClick={() => setSelectedTab('images')}
              className={`px-8 py-4 font-semibold border-b-4 transition-all ${selectedTab === 'images' ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Image Library ({uploadedImages.length})
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Messages */}
        {message && (
          <div className={`mb-6 px-6 py-4 rounded-xl text-base font-medium shadow-lg border-2 animate-slideIn flex justify-between items-center ${message.type === 'success' ? 'bg-green-50 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800'}`}>
            <span>{message.text}</span>
            {message.showPreview && (
              <button
                onClick={() => window.open(`/${selectedPage === 'home' ? '' : selectedPage}`, '_blank')}
                className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Preview Page
              </button>
            )}
          </div>
        )}

        {/* Content Editor Tab */}
        {selectedTab === 'editor' && (
          <>
            <div className="mb-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <label className="block text-gray-900 font-bold mb-4 text-lg">Select Page to Edit:</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['home', 'about', 'services', 'contact'].map((page) => (
                  <button
                    key={page}
                    onClick={() => loadContent(page)}
                    className={`px-6 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${selectedPage === page ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-xl scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow'}`}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {content && (
              <div>
                <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <span className="w-2 h-6 bg-blue-500 rounded"></span>
                          JSON Editor
                        </h3>
                        <button
                          onClick={() => handleSave()}
                          disabled={loading}
                          className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 flex items-center gap-2"
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Saving...
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <textarea
                      value={editedContent}
                      onChange={(e) => {
                        setEditedContent(e.target.value);
                        try {
                          setContent(JSON.parse(e.target.value));
                        } catch (err) {
                          // Invalid JSON, don't update content
                        }
                      }}
                      className="w-full h-96 p-6 font-mono text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 bg-gray-50"
                    />

                    <p className="mt-4 text-sm text-gray-600 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Advanced users: Edit JSON directly. Make sure to maintain valid JSON format.
                    </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Image Manager Tab */}
        {selectedTab === 'images' && (
          <>
            {/* Upload Section with Drag & Drop */}
            <div className="mb-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-emerald-500 rounded"></span>
                Upload New Image
              </h2>

              <div
                className={`relative border-4 border-dashed rounded-2xl p-12 text-center transition-all ${
                  dragActive
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-300 bg-gray-50 hover:border-emerald-400 hover:bg-emerald-50/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />

                {previewImage ? (
                  <div className="space-y-4">
                    <img src={previewImage} alt="Preview" className="mx-auto max-h-64 rounded-lg shadow-lg" />
                    <p className="text-emerald-600 font-semibold">Uploading...</p>
                    {uploadProgress > 0 && (
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
                        <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{width: `${uploadProgress}%`}}></div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-gray-700 mb-2">
                        Drag and drop your image here
                      </p>
                      <p className="text-gray-500 mb-4">or</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-all transform hover:scale-105 shadow-lg"
                      >
                        Browse Files
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Supported: JPG, PNG, GIF, WebP (Max 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Images Grid */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-emerald-500 rounded"></span>
                Image Library ({uploadedImages.length} {uploadedImages.length === 1 ? 'image' : 'images'})
              </h2>

              {uploadedImages.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-lg">No images uploaded yet</p>
                  <p className="text-gray-500 text-sm mt-2">Upload your first image using the form above</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {uploadedImages.map((img) => (
                    <div
                      key={img.filename}
                      className="group border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 bg-white"
                    >
                      <div className="relative overflow-hidden bg-gray-100">
                        <img
                          src={img.url}
                          alt={img.filename}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                          <button
                            onClick={() => window.open(img.url, '_blank')}
                            className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-all"
                          >
                            View Full Size
                          </button>
                        </div>
                      </div>

                      <div className="p-4">
                        <p className="text-sm text-gray-700 font-medium mb-3 truncate" title={img.filename}>
                          {img.filename}
                        </p>

                        <div className="flex gap-2 mb-3">
                          <button
                            onClick={() => copyToClipboard(img.url)}
                            className="flex-1 bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy URL
                          </button>
                          <button
                            onClick={() => handleDeleteImage(img.filename)}
                            className="flex-1 bg-red-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>

                        <div className="bg-gray-50 px-3 py-2 rounded-lg">
                          <p className="text-xs text-gray-600 font-mono truncate">{img.url}</p>
                        </div>
                      </div>
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
