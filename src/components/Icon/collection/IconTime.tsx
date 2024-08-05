import { convertIcon } from '@douyinfe/semi-icons';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      // 注意自定义icon需要加上下面参数
      width="1em"
      height="1em"
      focusable={false}
      aria-hidden={true}
      {...props}
    >
      <path
        d="M708.48 563.008a51.008 51.008 0 1 1 102.08 0 51.008 51.008 0 0 1-102.08 0zM512.448 16.32C785.728 16.32 1008 238.72 1008 512a36.224 36.224 0 1 1-72.448 0 423.552 423.552 0 0 0-423.104-423.04A423.552 423.552 0 0 0 89.344 512a423.552 423.552 0 0 0 423.168 423.04 420.736 420.736 0 0 0 359.936-200.576l33.856 14.08-31.104-18.624c3.008-4.992 5.888-10.048 8.704-15.168a36.288 36.288 0 0 1 63.68 34.688 507.52 507.52 0 0 1-10.24 17.92l-3.264 5.248a493.056 493.056 0 0 1-421.632 235.008C239.168 1007.616 16.832 785.28 16.832 512S239.168 16.32 512.448 16.32z m-7.232 189.44c21.12 0 38.272 14.464 38.272 32.256v243.392h78.784c21.12 0 38.272 14.4 38.272 32.192s-17.152 32.192-38.272 32.192H505.216c-21.12 0-38.272-14.4-38.272-32.192V238.016c0-17.792 17.152-32.256 38.272-32.256z"
        fill="#000000"
        p-id="10244"
      ></path>
    </svg>
  );
}
export const IconTime = convertIcon(SvgComponent, 'align_center_vertical');