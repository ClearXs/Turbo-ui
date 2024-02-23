import { convertIcon } from '@douyinfe/semi-icons';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      t="1706863247855"
      class="icon"
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
        d="M526.6 203.5H91.2c-15 0-27.2 12.2-27.2 27.2v217.7c0 15 12.2 27.2 27.2 27.2h190.5v248.1c0 15 12.2 27.2 27.2 27.2l132.1 0.1c15 0 27.2-12.2 27.2-27.2S456 696.6 441 696.6H336.1v-221h190.5c15 0 27.2-12.2 27.2-27.2V230.7c0.1-15-12.2-27.2-27.2-27.2z m-27.2 217.7h-381V257.9h381v163.3z"
        p-id="10556"
      ></path>
      <path
        d="M862.8 712v61H530.7V630.7h102.5v-47.4H507c-13.1 0-23.7 10.7-23.7 23.7v189.7c0 13.1 10.7 23.7 23.7 23.7l379.5 0.1c13.1 0 23.7-10.7 23.7-23.7V712h-47.4z"
        p-id="10557"
      ></path>
      <path
        d="M937.6 529.6H833V425c0-12.4-10-22.4-22.4-22.4-12.4 0-22.4 10-22.4 22.4v104.6H683.7c-12.3 0-22.4 10-22.4 22.4s10 22.4 22.4 22.4h104.6V679c0 12.4 10 22.4 22.4 22.4 12.4 0 22.4-10 22.4-22.4V574.3h104.6c12.3 0 22.4-10 22.4-22.4 0-5.9-2.4-11.6-6.5-15.8-4.3-4.2-10-6.5-16-6.5z"
        p-id="10558"
      ></path>
    </svg>
  );
}
export const IconSubordinate = convertIcon(
  SvgComponent,
  'align_center_vertical',
);
