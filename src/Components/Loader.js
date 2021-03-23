import spinner from "./spinner.gif";
const Loader = () => {
  return (
    <div
      className="loader"
      container
      justify="center"
      alignItems="center"
      style={{ height: "100%", width: "100%" }}
    >
      <img src={spinner} alt="Loading" />
    </div>
  );
};

export default Loader;
