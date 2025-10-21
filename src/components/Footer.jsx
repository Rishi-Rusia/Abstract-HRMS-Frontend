function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-screen bg-gray-100 text-center py-3 border-t border-gray-200 z-50">
  <p className="text-gray-600 text-sm">
    © {new Date().getFullYear()} HRMS. All rights reserved.
  </p>
</footer>

  )
}

export default Footer
