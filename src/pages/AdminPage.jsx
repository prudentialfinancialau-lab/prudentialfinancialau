import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function AdminPage() {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('admin_token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('admin_token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchPages();
    }
  }, [isAuthenticated]);

  const fetchPages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/pages`);
      const data = await response.json();
      setPages(data.pages);
      if (data.pages.length > 0) {
        loadPage(data.pages[0].id);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const loadPage = async (pageId) => {
    setLoading(true);
    setSelectedPage(pageId);
    try {
      const response = await fetch(`${API_URL}/api/content/${pageId}`);
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error loading page:', error);
      setMessage({ type: 'error', text: 'Failed to load page content' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('admin_token', authToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setAuthToken('');
    setContent(null);
    setSelectedPage(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch(`${API_URL}/api/content/${selectedPage}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(content)
      });

      if (!response.ok) {
        throw new Error('Failed to save content');
      }

      setMessage({ type: 'success', text: 'Content saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage({ type: 'error', text: 'Failed to save content. Check your auth token.' });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateNestedField = (section, index, field, value) => {
    setContent(prev => {
      const newArray = [...(prev[section].features || prev[section].lenderList)];
      newArray[index] = {
        ...newArray[index],
        [field]: value
      };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field === 'features' ? 'features' : 'lenderList']: newArray
        }
      };
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Auth Token</label>
              <input
                type="password"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin token"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Default token: admin-secret-token-12345
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Content Admin</h1>
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Site
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Sidebar */}
          <div className="col-span-3 bg-white rounded-lg shadow p-4">
            <h2 className="font-bold mb-4">Pages</h2>
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => loadPage(page.id)}
                className={`w-full text-left px-4 py-2 rounded mb-2 ${
                  selectedPage === page.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {page.name}
              </button>
            ))}
          </div>

          {/* Content Editor */}
          <div className="col-span-9 bg-white rounded-lg shadow p-6">
            {message && (
              <div className={`mb-4 p-4 rounded ${
                message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : content ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">
                    Editing: {pages.find(p => p.id === selectedPage)?.name}
                  </h2>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

                <div className="space-y-6">
                  {Object.keys(content).map((section) => (
                    <div key={section} className="border-b pb-6">
                      <h3 className="text-lg font-semibold mb-4 capitalize">
                        {section} Section
                      </h3>

                      {typeof content[section] === 'object' && !Array.isArray(content[section]) ? (
                        <div className="space-y-4">
                          {Object.keys(content[section]).map((field) => {
                            const value = content[section][field];

                            if (Array.isArray(value)) {
                              return (
                                <div key={field} className="border p-4 rounded">
                                  <label className="block font-medium mb-2 capitalize">
                                    {field}
                                  </label>
                                  {value.map((item, idx) => (
                                    <div key={idx} className="mb-4 p-3 bg-gray-50 rounded">
                                      {Object.keys(item).map((itemField) => (
                                        <div key={itemField} className="mb-2">
                                          <label className="block text-sm mb-1 capitalize">
                                            {itemField}
                                          </label>
                                          {itemField === 'description' ? (
                                            <textarea
                                              value={item[itemField] || ''}
                                              onChange={(e) => {
                                                const newArray = [...value];
                                                newArray[idx] = { ...newArray[idx], [itemField]: e.target.value };
                                                updateField(section, field, newArray);
                                              }}
                                              className="w-full px-3 py-2 border rounded"
                                              rows="2"
                                            />
                                          ) : (
                                            <input
                                              type="text"
                                              value={item[itemField] || ''}
                                              onChange={(e) => {
                                                const newArray = [...value];
                                                newArray[idx] = { ...newArray[idx], [itemField]: e.target.value };
                                                updateField(section, field, newArray);
                                              }}
                                              className="w-full px-3 py-2 border rounded"
                                            />
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  ))}
                                </div>
                              );
                            }

                            if (typeof value === 'object' && value !== null) {
                              return (
                                <div key={field} className="border p-4 rounded">
                                  <label className="block font-medium mb-2 capitalize">
                                    {field}
                                  </label>
                                  {Object.keys(value).map((subField) => (
                                    <div key={subField} className="mb-2">
                                      <label className="block text-sm mb-1 capitalize">
                                        {subField}
                                      </label>
                                      <input
                                        type="text"
                                        value={value[subField] || ''}
                                        onChange={(e) => updateField(section, field, {
                                          ...value,
                                          [subField]: e.target.value
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                      />
                                    </div>
                                  ))}
                                </div>
                              );
                            }

                            return (
                              <div key={field}>
                                <label className="block font-medium mb-2 capitalize">
                                  {field}
                                </label>
                                {field.includes('description') || field.includes('paragraph') || field.includes('quote') ? (
                                  <textarea
                                    value={value || ''}
                                    onChange={(e) => updateField(section, field, e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    rows="4"
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    value={value || ''}
                                    onChange={(e) => updateField(section, field, e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                Select a page to edit
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
