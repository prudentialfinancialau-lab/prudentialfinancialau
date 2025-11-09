import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';

export default function SimpleJsonEditor({ data, onChange }) {
  // Auto-generate schema from data structure
  const generateSchema = (obj, title = 'Root') => {
    if (obj === null || obj === undefined) {
      return { type: 'string', title };
    }

    if (Array.isArray(obj)) {
      return {
        type: 'array',
        title,
        items: obj.length > 0 ? generateSchema(obj[0], 'Item') : { type: 'string' }
      };
    }

    if (typeof obj === 'object') {
      const properties = {};
      Object.keys(obj).forEach(key => {
        properties[key] = generateSchema(obj[key], key.charAt(0).toUpperCase() + key.slice(1));
      });
      return {
        type: 'object',
        title,
        properties
      };
    }

    if (typeof obj === 'number') {
      return { type: 'number', title };
    }

    if (typeof obj === 'boolean') {
      return { type: 'boolean', title };
    }

    return { type: 'string', title };
  };

  const schema = generateSchema(data, 'Page Content');

  // Custom UI schema for better textarea handling
  const generateUISchema = (obj, path = '') => {
    if (typeof obj === 'string' && obj.length > 100) {
      return { 'ui:widget': 'textarea', 'ui:options': { rows: 5 } };
    }

    if (Array.isArray(obj)) {
      return {
        items: obj.length > 0 ? generateUISchema(obj[0]) : {}
      };
    }

    if (typeof obj === 'object' && obj !== null) {
      const uiSchema = {};
      Object.keys(obj).forEach(key => {
        const childUISchema = generateUISchema(obj[key], `${path}.${key}`);
        if (Object.keys(childUISchema).length > 0) {
          uiSchema[key] = childUISchema;
        }
      });
      return uiSchema;
    }

    return {};
  };

  const uiSchema = {
    ...generateUISchema(data),
    'ui:submitButtonOptions': {
      norender: true
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
      <Form
        schema={schema}
        formData={data}
        validator={validator}
        uiSchema={uiSchema}
        onChange={(e) => onChange(e.formData)}
        onSubmit={() => {}} // We handle submit externally
        className="rjsf-form"
      >
        <div></div> {/* Empty div to prevent default submit button */}
      </Form>

      <style>{`
        .form-group {
          margin-bottom: 1.5rem;
        }
        label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          display: block;
          font-size: 0.95rem;
        }
        input[type="text"],
        input[type="number"],
        input[type="url"],
        input[type="email"],
        textarea,
        select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: border-color 0.2s;
          background: white;
        }
        input:focus,
        textarea:focus,
        select:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
        fieldset {
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin-bottom: 1rem;
          background: #f9fafb;
        }
        legend {
          font-weight: 700;
          color: #1f2937;
          padding: 0 0.5rem;
          font-size: 1.125rem;
        }
        .array-item {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          position: relative;
        }
        .array-item-toolbox {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }
        button {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.875rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          min-height: 38px;
        }
        .btn-add,
        button[type="button"]:not(.array-item-remove):not(.array-item-move-up):not(.array-item-move-down),
        .array-item-remove,
        .btn-danger,
        .array-item-move-up,
        .array-item-move-down {
          display: none !important;
        }
        .array-item-list {
          margin-top: 1rem;
        }
        .field-description {
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  );
}
