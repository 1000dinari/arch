
function Footer() {
    const footerYear = new Date().getFullYear()
  return (
    <footer className='footer p-10 shadow-lg bg-neutral text-neutral-content text-primary-content footer-center'>
        <div>
            Made with 🤍 in React+Tailwind
        </div>
    </footer>
  )
}

export default Footer