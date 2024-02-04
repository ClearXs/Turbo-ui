import { convertIcon } from '@douyinfe/semi-icons';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      t="1706863000315"
      class="icon"
      viewBox="0 0 1025 1024"
      version="1.1"
      // 注意自定义icon需要加上下面参数
      width="1em"
      height="1em"
      focusable={false}
      aria-hidden={true}
      {...props}
    >
      <path
        d="M651.8 775.5h-20.3v-527h178V305c0 19.3 15.7 35 35 35s35-15.7 35-35v-91.5c0-19.3-15.7-35-35-35h-248c-19.3 0-35 15.7-35 35V477H340.8V236.1c0-32-26-58-58-58H58c-32 0-58 26-58 58v551.8c0 32 26 58 58 58h224.8c32 0 58-26 58-58V547h220.7v263.5c0 19.3 15.7 35 35 35h55.3c19.3 0 35-15.7 35-35s-15.7-35-35-35z m-381 0.4H70V248.1h200.8v527.8z"
        p-id="5149"
      ></path>
      <path
        d="M990 651.5h-89v-89c0-19.3-15.7-35-35-35s-35 15.7-35 35v89h-89c-19.3 0-35 15.7-35 35s15.7 35 35 35h89v89c0 19.3 15.7 35 35 35s35-15.7 35-35v-89h89c19.3 0 35-15.7 35-35s-15.7-35-35-35z"
        p-id="5150"
      ></path>
    </svg>
  );
}
export const IconPeer = convertIcon(SvgComponent, 'align_center_vertical');
