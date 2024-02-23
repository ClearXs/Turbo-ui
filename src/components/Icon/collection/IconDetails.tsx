import { convertIcon } from '@douyinfe/semi-icons';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      t="1708238185494"
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
        d="M128 128h320v320H128zM544 128h352v96H544zM544 352h352v96H544zM128 576h320v320H128zM544 576h352v96H544zM544 800h352v96H544z"
        p-id="4286"
      ></path>
    </svg>
  );
}
export const IconDetails = convertIcon(SvgComponent, 'align_center_vertical');
