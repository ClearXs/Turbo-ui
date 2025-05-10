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
        d="M512 219.428571V146.285714h512v73.142857H512zM0 1024V0h365.714286v1024H0zM292.571429 73.142857H73.142857v877.714286h219.428572V73.142857z m585.142857 365.714286H512V365.714286h365.714286v73.142857z m0 219.428571H512V585.142857h365.714286v73.142857z m-146.285715 219.428572H512v-73.142857h219.428571v73.142857z"
        fill="#5B5B5B"
        p-id="7300"
      ></path>
    </svg>
  );
}
export const IconTreeModel = convertIcon(SvgComponent, 'align_center_vertical');
