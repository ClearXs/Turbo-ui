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
        d="M341.2 760.8l-46.5-148.4H104.2L57.1 760.8H0l163.2-497.7h74.4l162.5 497.7h-58.9zM122.8 555h153.9l-72.6-231.6h-7.4L122.8 555z m288.1 205.8V263.2H535c112.9 0 144.6 42.3 144.6 131.9 0 51.6-17.4 89.6-62.7 105.4v2.9c58.3 13.6 76.9 56.6 76.9 115.5 0 90.4-32.9 142-146.4 142H410.9z m55.8-279.6h42.2c82.5 0 116-17.2 116-82.5 0-73.1-33.5-81-116-81h-42.2v163.5z m0 224.4h57.7c88.1 0 113.5-16.5 113.5-87.5 0-61-26.1-86.1-113.5-86.1h-57.7v173.6zM919.8 768c-118.5 0-196-48-196-256 0-192.2 78.2-256 202.2-256 39.7 0 67.6 5 93.1 14.3v59.5c-24.8-10.8-54-17.2-91.8-17.2-98 0-145.2 49.5-145.2 197.9 0 158.5 44 199.4 139.6 199.4 40.3 0 69.5-6.5 102.4-19.4v55.9c-24.3 12.3-60.9 21.6-104.3 21.6z"
        fill="#5C626B"
        p-id="8311"
      ></path>
    </svg>
  );
}
export const IconCharacter = convertIcon(SvgComponent, 'align_center_vertical');
