import { convertIcon } from '@douyinfe/semi-icons';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      t="1698914408367"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="12336"
      // 注意自定义icon需要加上下面参数
      width="1em"
      height="1em"
      focusable={false}
      aria-hidden={true}
      {...props}
    >
      <path
        d="M697.84064 479.30368l311.51104-301.79328a47.74912 47.74912 0 0 1 14.30528 34.10432v607.616c0 12.6208-4.97152 23.9872-12.928 32.48128l-312.88832-372.40832zM16.3072 176.13824c8.49408-7.68 19.64032-12.48768 32.01024-12.48768h927.37024c12.33408 0 23.51616 4.80768 32.00512 12.48768L512 563.36896 16.3072 176.13824zM13.27616 851.712c-7.9616-8.49408-12.928-19.86048-12.928-32.48128V211.61472a47.74912 47.74912 0 0 1 14.30528-34.10432l311.50592 301.79328-312.8832 372.40832zM512 659.30752l130.06848-126.03904 366.49984 320.6912c-8.59136 8.12032-20.11136 13.24032-32.88576 13.24032H48.31744c-12.7744 0-24.2944-5.12-32.88576-13.24032l366.47424-320.6912L512 659.30752z"
        fill="#1296db"
        p-id="12337"
      ></path>
    </svg>
  );
}
const IconMessage = convertIcon(SvgComponent, 'align_center_vertical');
export default IconMessage;
