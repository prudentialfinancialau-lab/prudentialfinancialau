function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">
            TinaCMS + Vite + React
          </h1>
          <p className="text-xl text-gray-700">
            Git-backed visual editor for your content
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Welcome to TinaCMS
          </h2>
          <p className="text-gray-600 mb-4">
            This is a Vite + React application with TinaCMS integration.
            You can edit your content visually using the TinaCMS editor.
          </p>
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4">
            <p className="text-sm text-indigo-700">
              <strong>Note:</strong> TinaCMS is configured and ready.
              The visual editor will be integrated in the next steps.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Git-Backed CMS
            </h3>
            <p className="text-gray-600">
              Your content is stored in Git, making it version-controlled
              and easy to collaborate on.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Visual Editing
            </h3>
            <p className="text-gray-600">
              Edit your content with a beautiful visual interface
              without touching code.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Tailwind CSS
            </h3>
            <p className="text-gray-600">
              Styled with Tailwind CSS for rapid UI development
              and beautiful designs.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Vite Powered
            </h3>
            <p className="text-gray-600">
              Lightning-fast development with Vite's HMR
              and optimized build process.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
