
function Footer() {
    const footerYear = new Date().getFullYear()
  return (
    <footer className='footer p-10 bg-grey-700 text-primary-content footer-center'>
        <div>
            Made with 🤍 in React+Tailwind
        </div>
    </footer>
  )
}

export default Footer