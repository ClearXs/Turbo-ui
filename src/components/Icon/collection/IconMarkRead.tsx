import { convertIcon } from '@douyinfe/semi-icons';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
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
        d="M832 476.8v-35.2c0-21.6-17.6-39.2-39.2-39.2h-206.8V231.2c0-40.8-33.2-74-74-74s-74 33.2-74 74v171.6H231.2c-21.6 0-39.2 17.6-39.2 39.2v35.2c0 21.6 17.6 39.2 39.2 39.2h23.2L192 827.6v0.4c0 21.6 17.6 39.2 39.2 39.2h561.6c21.6 0 39.2-17.6 39.2-39.2v-0.4L769.6 516h23.2c21.6 0 39.2-17.6 39.2-39.2zM373.2 822l21.2-156c2-11.6-5.6-22.8-17.6-24.8-1.2-0.4-2.4-0.4-3.6-0.4-10.4 0-19.2 7.6-21.2 18l-21.2 156c-0.4 3.2-0.4 6.4 0.4 9.6H236l68.4-308h414.8l68.4 308H372.8c0.4-1.2 0.4-2 0.4-2.4zM512 200c17.2 0 31.2 14 31.2 31.2v171.6h-62.4V231.2c0-17.2 14-31.2 31.2-31.2z m276.8 245.6v27.2H235.2v-27.2h553.6z"
        fill="#707070"
        p-id="4327"
      ></path>
    </svg>
  );
}
export const IconMarkRead = convertIcon(SvgComponent, 'align_center_vertical');
