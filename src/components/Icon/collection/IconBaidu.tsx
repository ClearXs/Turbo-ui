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
        d="M252.885333 533.205333c88.021333-18.901333 76.032-124.117333 73.386667-147.114666-4.309333-35.413333-45.994667-97.365333-102.613333-92.458667-71.253333 6.4-81.621333 109.269333-81.621334 109.269333-9.642667 47.573333 23.04 149.205333 110.848 130.304z m93.44 182.954667c-2.56 7.381333-8.32 26.282667-3.328 42.752 9.813333 36.949333 41.898667 38.613333 41.898667 38.613333h46.08v-112.64H381.610667c-22.186667 6.570667-32.853333 23.850667-35.285334 31.274667z m69.888-359.338667c48.64 0 87.893333-55.978667 87.893334-125.141333 0-69.12-39.253333-125.013333-87.893334-125.013333-48.512 0-87.893333 55.893333-87.893333 125.013333 0 69.162667 39.381333 125.141333 87.893333 125.141333z m209.408 8.234667c64.938667 8.448 106.709333-60.885333 115.029334-113.450667 8.490667-52.48-33.450667-113.408-79.445334-123.904-46.08-10.581333-103.637333 63.274667-108.885333 111.36-6.272 58.88 8.405333 117.674667 73.301333 125.994667z m0 147.114667c-79.573333-123.946667-192.554667-73.514667-230.4-10.453334-37.589333 63.018667-96.256 102.826667-104.576 113.408-8.448 10.410667-121.429333 71.381333-96.341333 182.784 25.045333 111.317333 113.152 109.226667 113.152 109.226667s64.896 6.4 140.202667-10.496c75.349333-16.682667 140.202667 4.181333 140.202666 4.181333s176 58.88 224.128-54.528c48.128-113.493333-27.178667-172.288-27.178666-172.288s-100.522667-77.781333-159.232-161.834666z m-256.341333 330.666666c-49.408-9.856-69.077333-43.562667-71.552-49.322666-2.432-5.845333-16.469333-32.938667-9.045333-79.061334 21.333333-69.077333 82.218667-74.026667 82.218666-74.026666h60.928v-74.88l51.84 0.853333v276.437333h-114.346666z m195.84-0.810666c-51.029333-13.141333-53.376-49.408-53.376-49.408v-145.578667l53.376-0.853333v130.816c3.285333 13.994667 20.608 16.512 20.608 16.512h54.229333v-146.474667h56.832v194.986667h-131.669333z m318.037333-388.693334c0-25.173333-20.906667-100.864-98.346666-100.864-77.610667 0-87.978667 71.466667-87.978667 121.984 0 48.213333 4.053333 115.498667 100.437333 113.365334 96.426667-2.133333 85.888-109.226667 85.888-134.485334z"
        p-id="7301"
      ></path>
    </svg>
  );
}
export const IconBaidu = convertIcon(SvgComponent, 'align_center_vertical');
