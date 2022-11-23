export const ColoredMessage = (props) => {
  // Propsを分割代入
  // console.log(props)
  const { color, children } = props;
  // console.log(color)
  // console.log(children)

  const contentStyle = {
    color,
    fontSize: "20px",
  };

  return <p style={contentStyle}>{children}</p>;
};
