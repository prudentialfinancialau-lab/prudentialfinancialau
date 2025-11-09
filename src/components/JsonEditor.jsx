import { useState } from 'react';

export default function JsonEditor({ content, onSave, onCancel }) {
  const [formData, setFormData] = useState(content);
  const [viewMode, setViewMode] = useState('visual'); // 'visual' or 'json'

  const updateNestedValue = (obj, path, value) => {
    const keys = path.split('.');
    const newObj = JSON.parse(JSON.stringify(obj));
    let current = newObj;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    return newObj;
  };

  const handleFieldChange = (path, value) => {
    setFormData(updateNestedValue(formData, path, value));
  };

  const handleArrayItemChange = (path, index, field, value) => {
    const fullPath = `${path}.${index}.${field}`;
    setFormData(updateNestedValue(formData, fullPath, value));
  };

  const addArrayItem = (path, template) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(formData));
    let current = newData;

    for (const key of keys) {
      current = current[key];
    }

    if (Array.isArray(current)) {
      current.push(template);
    }

    setFormData(newData);
  };

  const removeArrayItem = (path, index) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(formData));
    let current = newData;

    for (const key of keys) {
      current = current[key];
    }

    if (Array.isArray(current)) {
      current.splice(index, 1);
    }

    setFormData(newData);
  };

  const renderField = (label, path, value, type = 'text') => {
    if (type === 'textarea') {
      return (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
          </label>
          <textarea
            value={value || ''}
            onChange={(e) => handleFieldChange(path, e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
            rows="4"
          />
        </div>
      );
    }

    if (type === 'url') {
      return (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={value || ''}
              onChange={(e) => handleFieldChange(path, e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="https://example.com/image.jpg"
            />
            {value && value.startsWith('/uploads/') && (
              <img src={value} alt="Preview" className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200" />
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
        <input
          type={type}
          value={value || ''}
          onChange={(e) => handleFieldChange(path, e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>
    );
  };

  const renderArray = (label, path, items, template, fields) => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">{label}</h3>
          <button
            onClick={() => addArrayItem(path, template)}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 text-sm font-semibold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New
          </button>
        </div>

        <div className="space-y-4">
          {items && items.map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-700">Item #{index + 1}</h4>
                <button
                  onClick={() => removeArrayItem(path, index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {fields.map((field) => {
                const value = item[field.key];
                return (
                  <div key={field.key} className="mb-4 last:mb-0">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={value || ''}
                        onChange={(e) => handleArrayItemChange(path, index, field.key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        rows="3"
                      />
                    ) : field.type === 'url' ? (
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={value || ''}
                          onChange={(e) => handleArrayItemChange(path, index, field.key, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                          placeholder="https://example.com/image.jpg"
                        />
                        {value && (value.startsWith('/uploads/') || value.startsWith('http')) && (
                          <img src={value} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-gray-300" />
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => handleArrayItemChange(path, index, field.key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVisualEditor = () => {
    // Hero Section
    if (formData.hero) {
      return (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-500 rounded"></span>
              Hero Section
            </h2>
            {renderField('Title', 'hero.title', formData.hero.title)}
            {renderField('Subtitle', 'hero.subtitle', formData.hero.subtitle, 'textarea')}
            {renderField('Button Text', 'hero.buttonText', formData.hero.buttonText)}
            {renderField('Button Link', 'hero.buttonLink', formData.hero.buttonLink)}
            {renderField('Background Image', 'hero.backgroundImage', formData.hero.backgroundImage, 'url')}
          </div>

          {/* Features */}
          {formData.hero.features && (
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-500 rounded"></span>
                Hero Features
              </h2>
              {renderArray(
                'Features',
                'hero.features',
                formData.hero.features,
                { icon: '', text: '' },
                [
                  { key: 'icon', label: 'Icon (Font Awesome class)', type: 'text' },
                  { key: 'text', label: 'Feature Text', type: 'text' }
                ]
              )}
            </div>
          )}
        </div>
      );
    }

    // Contact Section
    if (formData.contact) {
      return (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-500 rounded"></span>
              Contact Information
            </h2>
            {renderField('Page Title', 'contact.title', formData.contact.title)}
            {renderField('Map URL', 'contact.mapUrl', formData.contact.mapUrl, 'url')}
            {renderField('Location', 'contact.location', formData.contact.location)}
          </div>

          {formData.contact.labels && (
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-500 rounded"></span>
                Form Labels
              </h2>
              {renderField('First Name Label', 'contact.labels.firstName', formData.contact.labels.firstName)}
              {renderField('Last Name Label', 'contact.labels.lastName', formData.contact.labels.lastName)}
              {renderField('Phone Label', 'contact.labels.phone', formData.contact.labels.phone)}
              {renderField('Email Label', 'contact.labels.email', formData.contact.labels.email)}
              {renderField('Suburb Label', 'contact.labels.suburb', formData.contact.labels.suburb)}
              {renderField('Postcode Label', 'contact.labels.postcode', formData.contact.labels.postcode)}
              {renderField('State Label', 'contact.labels.state', formData.contact.labels.state)}
              {renderField('Purpose Label', 'contact.labels.purpose', formData.contact.labels.purpose)}
              {renderField('Comments Label', 'contact.labels.comments', formData.contact.labels.comments)}
              {renderField('Submit Button Text', 'contact.labels.submit', formData.contact.labels.submit)}
            </div>
          )}
        </div>
      );
    }

    // Service Types
    if (formData.serviceTypes) {
      return (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-500 rounded"></span>
              Service Types Section
            </h2>
            {renderField('Intro Text', 'serviceTypes.introText', formData.serviceTypes.introText)}
          </div>

          {formData.serviceTypes.services && (
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-500 rounded"></span>
                Services
              </h2>
              {renderArray(
                'Services',
                'serviceTypes.services',
                formData.serviceTypes.services,
                {
                  name: '',
                  image: '',
                  header: { title: '', description: '' }
                },
                [
                  { key: 'name', label: 'Service Name', type: 'text' },
                  { key: 'image', label: 'Service Image URL', type: 'url' }
                ]
              )}
            </div>
          )}
        </div>
      );
    }

    // Generic JSON view for complex structures
    return (
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Complex Structure - Use JSON View
        </h2>
        <p className="text-gray-600 mb-4">
          This content has a complex structure. Please use the JSON view for editing.
        </p>
        <button
          onClick={() => setViewMode('json')}
          className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Switch to JSON View
        </button>
      </div>
    );
  };

  return (
    <div>
      {/* View Mode Toggle */}
      <div className="mb-6 bg-white p-4 rounded-xl border-2 border-gray-200 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('visual')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'visual'
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Visual Editor (Easy)
            </span>
          </button>
          <button
            onClick={() => setViewMode('json')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              viewMode === 'json'
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              JSON Editor (Advanced)
            </span>
          </button>
        </div>
      </div>

      {/* Editor Content */}
      {viewMode === 'visual' ? (
        renderVisualEditor()
      ) : (
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
          <textarea
            value={JSON.stringify(formData, null, 2)}
            onChange={(e) => {
              try {
                setFormData(JSON.parse(e.target.value));
              } catch (err) {
                // Invalid JSON, don't update
              }
            }}
            className="w-full h-96 p-4 font-mono text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 bg-gray-50"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4 justify-end">
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Cancel
          </button>
        )}
        <button
          onClick={() => onSave(formData)}
          className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:shadow-xl transition-all transform hover:scale-105 font-bold flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Save Changes
        </button>
      </div>
    </div>
  );
}
