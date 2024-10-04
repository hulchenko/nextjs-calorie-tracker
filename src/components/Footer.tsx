const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <p className="absolute bottom-8 w-screen text-center">
      &copy; {year}{" "}
      <a
        target="_blank"
        href="https://github.com/hulchenko"
        className="text-teal-700 text-base"
      >
        hulchenko
      </a>
    </p>
  );
};

export default Footer;
