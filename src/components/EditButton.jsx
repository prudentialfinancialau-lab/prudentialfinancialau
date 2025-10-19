export default function EditButton() {
  const handleEdit = () => {
    window.location.href = '/admin/index.html#/collections/page';
  };

  return (
    <button
      onClick={handleEdit}
      className="fixed bottom-20 right-6 sm:bottom-24 sm:right-8 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors z-50 text-sm font-medium"
      aria-label="Edit this page"
    >
      ✏️ Edit Page
    </button>
  );
}
