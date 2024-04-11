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
        d="M904 275.8H773.5V119.6c0-30.9-25.1-56-56-56H119.8c-30.9 0-56 25.1-56 56v597.7c0 30.9 25.1 56 56 56H276v130.4c0 30.9 25.1 56 56 56h572c30.9 0 56-25.1 56-56v-572c0-30.7-25.1-55.9-56-55.9zM135.8 135.6h565.7v565.7H135.8V135.6zM888 887.8H348V773.4h369.5c30.9 0 56-25.1 56-56V347.8H888v540z"
        fill="#333333"
        p-id="4491"
      ></path>
      <path
        d="M615.2 285.6c-14.5-13.6-37.3-12.9-50.9 1.6L363.5 500.7l-91.4-90.2c-14.2-14-36.9-13.8-50.9 0.3-14 14.2-13.8 36.9 0.3 50.9l117.7 116.1c6.7 6.7 15.8 10.4 25.3 10.4h0.7c9.7-0.2 18.9-4.3 25.6-11.3l226.1-240.4c13.5-14.5 12.8-37.3-1.7-50.9z"
        fill="#333333"
        p-id="4492"
      ></path>
    </svg>
  );
}
export const IconAllRead = convertIcon(SvgComponent, 'align_center_vertical');
