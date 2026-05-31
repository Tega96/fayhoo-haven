import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram, faTwitter, faLinkedin, faYoutube} from "@fortawesome/free-brands-svg-icons"


const NAVLINK = [
    {linkHref: '/about', linkTitle: "About"},
    {linkHref: '/contact', linkTitle: "Contact"},
    {linkHref: '/faq', linkTitle: "FAQ"},
    {linkHref: '/terms', linkTitle: "Terms"},
    {linkHref: '/privacy', linkTitle: "Privacy"},
];

const SOCIAL_LINK = [
    {linkHref: '/facebook', linkTitle: 'Facebook', icon: faFacebook  },
    {linkHref: '/instagram', linkTitle: 'Instagram', icon: faInstagram  },
    {linkHref: '/twitter', linkTitle: 'Twitter', icon: faTwitter  },
    {linkHref: '/linkedin', linkTitle: 'Linkedin', icon: faLinkedin  },
    {linkHref: '/youtube', linkTitle: 'Youtube', icon: faYoutube  }
]

const FooterSection = () => {
  return (
    <footer className="border-t border-gray-300 py-20 ">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 ">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4">
                    <Link href="/" className="text-xl font-bold" scroll={false}>
                        Fayhoo Haven
                    </Link>
                </div>
                <nav className="mb-4">
                    <ul className="flex space-x-6">
                        {NAVLINK.map(({linkTitle, linkHref}) => (
                            <li key={linkTitle}>
                                <Link href={linkHref}>{linkTitle}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex space-x-4 mb-4">
                    {SOCIAL_LINK.map(({linkHref, linkTitle, icon}) => (
                        <a 
                            href={linkHref} 
                            aria-label={linkTitle} 
                            className="hover:text-primary-600"
                        >
                            <FontAwesomeIcon icon={icon} className="h-6 w-6" />
                        </a>
                    ))}
                </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-500 flex justify-center space-x-4">
                <span>&copy; FAyhoo. All rights reserved - {new Date().getFullYear()}</span>
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms of Service</Link>
                <Link href="/cookies">Cookie Policy</Link>
            </div>
        </div>
      
    </footer>
  )
}

export default FooterSection
