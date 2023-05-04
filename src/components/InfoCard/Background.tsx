interface BackgroundProps {
  url: string;
}

export default (props: BackgroundProps) => (
  <div style={{
    "width": "100%",
    "height": "60px",
    "background": `url(${props.url}) center center / cover no-repeat`,
  }} />
);
