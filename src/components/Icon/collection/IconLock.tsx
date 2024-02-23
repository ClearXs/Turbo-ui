import { convertIcon } from '@douyinfe/semi-icons';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      t="1708258614630"
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
        d="M923.927273 209.454545c-6.981818-9.309091-23.272727-11.636364-32.581818-4.654545-9.309091 6.981818-11.636364 23.272727-4.654546 32.581818C947.2 316.509091 977.454545 411.927273 977.454545 512c0 256-209.454545 465.454545-465.454545 465.454545S46.545455 768 46.545455 512 256 46.545455 512 46.545455c100.072727 0 195.490909 30.254545 274.618182 90.763636 9.309091 6.981818 25.6 4.654545 32.581818-4.654546s4.654545-25.6-4.654545-32.581818C726.109091 34.909091 621.381818 0 512 0 230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512c0-109.381818-34.909091-214.109091-100.072727-302.545455z"
        fill=""
        p-id="6299"
      ></path>
      <path
        d="M512 253.672727c-72.145455 0-132.654545 60.509091-132.654545 132.654546V442.181818c-37.236364 0-67.490909 32.581818-67.49091 69.818182v188.509091c0 39.563636 30.254545 69.818182 69.818182 69.818182h260.654546c39.563636 0 69.818182-30.254545 69.818182-69.818182V512c0-37.236364-30.254545-69.818182-67.49091-69.818182v-55.854545c0-72.145455-60.509091-132.654545-132.654545-132.654546z m0 46.545455c46.545455 0 86.109091 39.563636 86.109091 86.109091V442.181818h-172.218182v-55.854545c0-46.545455 39.563636-86.109091 86.109091-86.109091z m153.6 211.781818v188.509091c0 13.963636-9.309091 23.272727-23.272727 23.272727H381.672727c-13.963636 0-23.272727-9.309091-23.272727-23.272727V512c0-13.963636 9.309091-23.272727 23.272727-23.272727h260.654546c13.963636 0 23.272727 9.309091 23.272727 23.272727z"
        fill=""
        p-id="6300"
      ></path>
    </svg>
  );
}
export const IconLock = convertIcon(SvgComponent, 'align_center_vertical');
