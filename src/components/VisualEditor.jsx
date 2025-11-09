import { useState } from 'react';

export default function VisualEditor({ content, onSave, pageName }) {
  const [data, setData] = useState(content);

  const updateValue = (path, value) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(data));
    let current = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setData(newData);
  };

  const updateArrayItem = (path, index, field, value) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(data));
    let current = newData;

    for (const key of keys) {
      current = current[key];
    }

    if (Array.isArray(current) && current[index]) {
      current[index][field] = value;
    }

    setData(newData);
  };

  const addArrayItem = (path, template) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(data));
    let current = newData;

    for (const key of keys) {
      if (!current[key]) current[key] = [];
      current = current[key];
    }

    if (Array.isArray(current)) {
      current.push(template);
    }

    setData(newData);
  };

  const removeArrayItem = (path, index) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(data));
    let current = newData;

    for (const key of keys) {
      current = current[key];
    }

    if (Array.isArray(current)) {
      current.splice(index, 1);
    }

    setData(newData);
  };

  const getValue = (path) => {
    const keys = path.split('.');
    let current = data;

    for (const key of keys) {
      if (current && typeof current === 'object') {
        current = current[key];
      } else {
        return '';
      }
    }

    return current || '';
  };

  const Section = ({ title, children, color = 'emerald' }) => (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className={`w-2 h-6 bg-${color}-500 rounded`}></span>
        {title}
      </h3>
      {children}
    </div>
  );

  const TextField = ({ label, path, type = 'text', help }) => (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={getValue(path)}
        onChange={(e) => updateValue(path, e.target.value)}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
      />
      {help && <p className="text-xs text-gray-500 mt-1">{help}</p>}
    </div>
  );

  const TextArea = ({ label, path, rows = 4, help }) => (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        value={getValue(path)}
        onChange={(e) => updateValue(path, e.target.value)}
        rows={rows}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
      />
      {help && <p className="text-xs text-gray-500 mt-1">{help}</p>}
    </div>
  );

  const ImageField = ({ label, path, help }) => {
    const value = getValue(path);
    return (
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => updateValue(path, e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="/uploads/image.jpg"
          />
          {value && (
            <div className="w-20 h-20 rounded-lg border-2 border-gray-200 overflow-hidden flex-shrink-0">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        {help && <p className="text-xs text-gray-500 mt-1">{help}</p>}
      </div>
    );
  };

  const ArrayEditor = ({ title, path, template, fields }) => {
    const items = getValue(path) || [];

    return (
      <Section title={title} color="blue">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="bg-gray-50 p-5 rounded-lg border-2 border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-700">#{index + 1}</h4>
                <button
                  onClick={() => removeArrayItem(path, index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors"
                  title="Delete"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {fields.map(field => (
                <div key={field.key} className="mb-3 last:mb-0">
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={item[field.key] || ''}
                      onChange={(e) => updateArrayItem(path, index, field.key, e.target.value)}
                      rows={field.rows || 3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  ) : field.type === 'image' ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item[field.key] || ''}
                        onChange={(e) => updateArrayItem(path, index, field.key, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="/uploads/image.jpg"
                      />
                      {item[field.key] && (
                        <img src={item[field.key]} alt="Preview" className="w-12 h-12 object-cover rounded border" />
                      )}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={item[field.key] || ''}
                      onChange={(e) => updateArrayItem(path, index, field.key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}

          <button
            onClick={() => addArrayItem(path, template)}
            className="w-full bg-emerald-500 text-white px-4 py-3 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Item
          </button>
        </div>
      </Section>
    );
  };

  return (
    <div className="space-y-6">
      {/* HOME PAGE */}
      {data.hero && (
        <>
          <Section title="Hero Section">
            <TextField label="Breadcrumb" path="hero.breadcrumb" help="e.g., Home / Independent Mortgage Brokers" />
            <TextField label="Main Title" path="hero.title" />
            <TextArea label="Content/Description" path="hero.content" rows={3} />
            <TextField label="Button Text" path="hero.buttonText" />
            <TextField label="Form Title" path="hero.formTitle" />
            <ImageField label="Hero Image" path="hero.heroImage" help="Upload an image and paste the URL here" />
          </Section>

          <Section title="About Section">
            <TextField label="Label" path="about.label" />
            <TextField label="Title" path="about.title" />
            <TextArea label="Paragraph 1" path="about.paragraph1" />
            <TextArea label="Paragraph 2" path="about.paragraph2" />
            <TextField label="Quote" path="about.quote" />
            <TextField label="Quote Author" path="about.quoteAuthor" />
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Stat 1 Value" path="about.stat1Value" help="e.g., 1000+" />
              <TextField label="Stat 1 Label" path="about.stat1Label" help="e.g., Happy Clients" />
              <TextField label="Stat 2 Value" path="about.stat2Value" help="e.g., 100%" />
              <TextField label="Stat 2 Label" path="about.stat2Label" help="e.g., Independent Advice" />
            </div>
            <ImageField label="About Image" path="about.image" />
          </Section>

          <Section title="What We Do Section">
            <TextField label="Title" path="help.title" />
            <TextArea label="Description" path="help.description" />
            <TextField label="Stat Value" path="help.statValue" help="e.g., 50+" />
            <TextField label="Stat Label" path="help.statLabel" help="e.g., Lender Partnerships" />
            <ImageField label="Section Image" path="help.image" />
          </Section>

          {data.help?.features && (
            <ArrayEditor
              title="Help Features"
              path="help.features"
              template={{ icon: 'fas fa-star', title: '', description: '' }}
              fields={[
                { key: 'icon', label: 'Icon (Font Awesome)', type: 'text' },
                { key: 'title', label: 'Feature Title', type: 'text' },
                { key: 'description', label: 'Description', type: 'textarea', rows: 2 }
              ]}
            />
          )}
        </>
      )}

      {/* CONTACT PAGE */}
      {data.contact && (
        <>
          <Section title="Contact Information">
            <TextField label="Page Title" path="contact.title" />
            <TextField label="Google Maps Embed URL" path="contact.mapUrl" type="url" help="Get embed URL from Google Maps" />
            <TextField label="Location Address" path="contact.location" />
          </Section>

          {data.contact.labels && (
            <Section title="Form Field Labels">
              <div className="grid grid-cols-2 gap-4">
                <TextField label="First Name Label" path="contact.labels.firstName" />
                <TextField label="Last Name Label" path="contact.labels.lastName" />
                <TextField label="Phone Label" path="contact.labels.phone" />
                <TextField label="Email Label" path="contact.labels.email" />
                <TextField label="Suburb Label" path="contact.labels.suburb" />
                <TextField label="Postcode Label" path="contact.labels.postcode" />
                <TextField label="State Label" path="contact.labels.state" />
                <TextField label="Purpose Label" path="contact.labels.purpose" />
              </div>
              <TextArea label="Comments Label" path="contact.labels.comments" rows={2} />
              <TextField label="Submit Button Text" path="contact.labels.submit" />
            </Section>
          )}
        </>
      )}

      {/* SERVICES PAGE */}
      {data.serviceTypes && (
        <>
          <Section title="Service Types Section">
            <TextField label="Intro Text" path="serviceTypes.introText" />
          </Section>

          {data.serviceTypes.services && (
            <ArrayEditor
              title="Services List"
              path="serviceTypes.services"
              template={{
                name: '',
                image: '',
                header: { title: '', description: '' }
              }}
              fields={[
                { key: 'name', label: 'Service Name', type: 'text' },
                { key: 'image', label: 'Service Image URL', type: 'image' }
              ]}
            />
          )}
        </>
      )}

      {/* ABOUT PAGE */}
      {data.content?.sections && (
        <Section title="About Page Sections">
          <p className="text-gray-600 mb-4">
            This page has complex nested content. Use JSON mode for full editing control.
          </p>
          <button
            onClick={() => alert('Switch to JSON mode using the toggle above')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Switch to JSON Editor
          </button>
        </Section>
      )}

      {/* SAVE BUTTON */}
      <div className="sticky bottom-0 bg-white p-6 rounded-xl border-2 border-gray-200 shadow-2xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              Click save to update the <strong>{pageName}</strong> page content
            </p>
          </div>
          <button
            onClick={() => onSave(data)}
            className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}
