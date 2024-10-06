const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <p className="absolute bottom-6 sm:bottom-8 w-full text-center">
      &copy; {year} by{" "}
      <a
        target="_blank"
        href="https://github.com/hulchenko"
        className="text-teal-700 font-bold"
      >
        hulchenko
      </a>
    </p>
  );
};

export default Footer;
