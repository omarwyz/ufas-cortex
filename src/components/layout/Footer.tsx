import Link from 'next/link';

const footerLinks = {
  platform: [
    { href: '/#features', label: 'Features' },
    { href: '/#years', label: 'Academic Years' },
    { href: '/resources', label: 'Resources' },
  ],
  support: [
    { href: '/help', label: 'Help Center' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQ' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
                <span className="text-sm font-bold text-white">UC</span>
              </div>
              <span className="font-heading text-lg font-semibold text-gray-900 dark:text-white">
                UFAS Cortex
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Learn More. Stress Less.
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Modern educational platform for medical students.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Platform</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Support</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-500">
            © {currentYear} UFAS Cortex. All rights reserved. Faculty of Medicine, University Ferhat
            Abbas Setif 1.
          </p>
        </div>
      </div>
    </footer>
  );
}
