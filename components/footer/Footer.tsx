import Image from "next/image";

const SOCIAL_ICONS = [
  {
    src: "/assets/gg_facebook.svg",
    alt: "Facebook",
  },
  {
    src: "/assets/prime_twitter.svg",
    alt: "Twitter",
  },
  {
    src: "/assets/formkit_instagram.svg",
    alt: "Instagram",
  },
];

export default function Footer() {
  return (
    <footer className="footer-section bg-[#161616] py-[94px] px-[60px] flex justify-between items-center border-t border-white/5">
      <div className="navbar-logo">
        <Image
          src="/assets/logo.svg"
          alt="Nike Logo"
          width={80}
          height={30}
          className="brightness-0 invert"
        />
      </div>

      <div className="social-icons-section flex gap-8">
        {SOCIAL_ICONS.map((icon) => (
          <Image
            key={icon.src}
            src={icon.src}
            alt={icon.alt}
            width={24}
            height={24}
            className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          />
        ))}
      </div>
    </footer>
  );
}

