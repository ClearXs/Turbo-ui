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
        d="M412.2 292.2c-9.5 0-17.9 3.6-25 10.9-7.1 7.3-10.7 15.8-10.7 25.6v366.4c0 10.5 3.4 19.3 10.1 26.2 6.8 6.9 15.3 10.4 25.6 10.4s18.9-3.5 25.6-10.4c6.8-6.9 10.1-15.6 10.1-26.2V328.7c0-9.7-3.4-18.3-10.1-25.6-6.7-7.3-15.3-10.9-25.6-10.9z m-199.7 0c-9.5 0-17.9 3.6-25 10.9-7.1 7.3-10.7 15.8-10.7 25.6v366.4c0 10.5 3.4 19.3 10.1 26.2 6.8 6.9 15.3 10.4 25.6 10.4s18.9-3.5 25.6-10.4c6.8-6.9 10.1-15.6 10.1-26.2V328.7c0-9.7-3.4-18.3-10.1-25.6-6.7-7.3-15.3-10.9-25.6-10.9z m399.4 0c-10.3 0-18.9 3.6-25.6 10.9-6.8 7.3-10.1 15.8-10.1 25.6v366.4c0 10.5 3.4 19.3 10.1 26.2 6.8 6.9 15.3 10.4 25.6 10.4s18.9-3.5 25.6-10.4c6.8-6.9 10.1-15.6 10.1-26.2V328.7c0-10.5-3.4-19.3-10.1-26.2-6.7-6.9-15.3-10.3-25.6-10.3z m199.7 0c-10.3 0-18.9 3.6-25.6 10.9-6.8 7.3-10.1 15.8-10.1 25.6v366.4c0 10.5 3.4 19.3 10.1 26.2 6.8 6.9 15.3 10.4 25.6 10.4s18.9-3.5 25.6-10.4c6.8-6.9 10.1-15.6 10.1-26.2V328.7c0-10.5-3.4-19.3-10.1-26.2-6.8-6.9-15.3-10.3-25.6-10.3z m59.2-220.3H153.2c-19.1 0.8-37.4 4.9-54.8 12.2-17.5 7.3-33 17.9-46.5 31.7s-24 29.6-31.6 47.5C12.8 181.1 9 199.7 9 219.2V806c0 19.5 3.8 38.2 11.3 56 7.6 17.9 18.1 33.7 31.6 47.5 13.5 13.8 29 24.3 46.5 31.7 17.5 7.3 35.8 11 54.8 10.9h717.5c19.1 0 37.4-3.6 54.8-10.9 17.5-7.3 33-17.9 46.5-31.7s24-29.6 31.6-47.5c7.5-17.8 11.3-36.5 11.3-56V219.2c0-19.5-3.8-38.2-11.3-56-7.6-17.9-18.1-33.7-31.6-47.5-13.5-13.8-29-24.3-46.5-31.7-17.4-7.3-35.7-11.3-54.7-12.1z m0 74.2c20.7 0 37.8 6.9 51.3 20.7 13.5 13.8 20.3 31.2 20.3 52.4V806c0 20.3-7 37.5-20.9 51.7-13.9 14.2-30.8 21.3-50.6 21.3H153.2c-19.9 0-36.7-7.1-50.6-21.3-13.9-14.2-20.9-31.5-20.9-51.7V219.1c0-21.1 6.8-38.6 20.3-52.4 13.5-13.8 30.6-20.7 51.3-20.7h717.5z"
        fill="#595959"
        p-id="4461"
      ></path>
    </svg>
  );
}
export const IconAutoNumber = convertIcon(
  SvgComponent,
  'align_center_vertical',
);