type SvgIconTypes = {
  src: string;
};

function SvgIconComp({src}: SvgIconTypes) {
  return (
    <>
      <img src={src} />
    </>
  );
}

export default SvgIconComp;
