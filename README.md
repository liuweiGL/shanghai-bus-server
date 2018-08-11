# shanghai-bus-server

> 上海公交服务端

## API

> 因为这个服务其实也是代理第三方API，错误信息分为两种：后端http请求第三方API时发生的错误以及根据业务逻辑自定义的错误，所以返回的错误信息可能不统一；

```ts

// 状态
interface Status{
  SUCCESS;
  FAIL;
}

// 后台http请求发生错误
interface HttpException {
    status: number; // 代理请求错误状态码，一般是 500
    config: Any; // Axios 的配置信息
    header: Any; // 请求头
    data: string; // 第三方返回的错误信息
}

// 第三方返回的数据不满足业务需要，自定义的异常
interface CustomException {
  data: {
    msg: string;
  };
}

// resopnse格式
interface Response {
  status: Status;
  data: Any;
}

// 请求失败
interface Fail {
  status: Status.FAIL;
  data: HttpException | CustomException;
}

```

### 1. 附近公交

> 查询附近500米范围内的公交信息：`/bus/list`

#### 请求方式：GET

#### 参数：

| 字段 | 类型 | 必须 | 描述 |
| ---- | ---- |--|--|
|location|`lng,lat`|是|范围中心点的经纬度|

#### 响应结果

```ts

interface Success {
  status: Status.SUCCESS;
  data: {
    routerNames: Array<string>;
  };
}

// 请求失败，可以根据data.msg信息去高德地图文档查看对应的错误代码调试
// see detail: https://lbs.amap.com/api/webservice/guide/tools/info

```

----------------

### 2. 公交详情

> 根据公交路线查询详细信息，包括首末班车时间，车票价格，站台列表等：`/bus/detail`

#### 请求方式：GET

#### 参数：

| 字段 | 类型 | 必须 | 描述 |
| ---- | ---- |--|--|
|router|String|是|要查询的公交路线|

#### 响应结果

```ts

// 时间格式：小时分钟
type Time = 'HHmm';

// 站台
interface Station {
  name: string;
  startTime?: Time; // 首班车时间
  endTime?: Time; // 末班车时间
}

// 公交路线
interface Router {
  sid: string; // 路线标识，路线名称进行 md5 32位加密
  direction: number; // 行驶方向
  name: string; // 路线名称
  company: string; // 所属公司
  price: number; // 票价
  startTime: Time; // 首班车时间
  endTime: time; // 末班车时间
  interval: Time; // 发车间隔
  frontName: string; // 始发站
  terminalName: string; // 终点站
  stations: Array<Station>; // 站台列表
}

// 请求成功
interface Success {
  status: Status.SUCCESS;
  data: {
    routers: Array<Router>;
  };
}

// 请求失败，可以根据data.msg信息去高德地图文档查看对应的错误代码调试
// see detail: https://lbs.amap.com/api/webservice/guide/tools/info

```

----------------

### 3. 实时公交

> 查询公交到站的实时信息：`/bus/stop`

#### 请求方式：GET

#### 参数

| 字段 | 类型 | 必须 | 描述 |
| ---- | ---- |--|--|
|direction|Number|是| `0` \| `1`，公交行驶方向|
|stationIndex|Number|是|要查询的站台在站台列表中的下标|
|sid|String|是|公交路线标识|

#### 响应结果

```ts

// 到站信息
interface DataItem {
  time; // 到站时间，单位：秒
  distance; // 到站距离，单位：米
  routerName; // 公交路线名称
  stationSum; // 途径站数
  plateNumber; // 车牌号
}

// 请求成功
interface Success {
  status: Status.SUCCESS;
  data: Array<DataItem>;
}

```

----------------

### 开发陷阱

+ `Axios` ： `POST` 传参问题

> 在 `Nodejs` 环境中使用 `POST` 请求时，总是无法预期的传递参数。
> `Axios` 文档中提到 `data` 的类型为 `Object`，但其实在 `Nodejs` 中 `Axios` 使用的是`http.request`，支持的参数格式为 `querystring`；因此 `data` 参数需要改为 `key=value` 格式的字符串。调试了一下午，我也是日了狗。

### API Test

> [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/ad735d3a15a785b32e4d)