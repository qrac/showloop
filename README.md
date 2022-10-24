# showloop

<p>
  <a aria-label="Made by QRANOKO" href="https://qranoko.jp">
    <img src="https://img.shields.io/badge/MADE%20BY%20QRANOKO-212121.svg?style=for-the-badge&labelColor=212121">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/showloop">
    <img alt="" src="https://img.shields.io/npm/v/showloop.svg?style=for-the-badge&labelColor=212121">
  </a>
  <a aria-label="License" href="https://github.com/qrac/showloop/blob/main/LICENSE">
    <img alt="" src="https://img.shields.io/npm/l/showloop.svg?style=for-the-badge&labelColor=212121">
  </a>
</p>

## Demo

- デザインの例: https://codepen.io/qrac/full/LYrPXjJ
- オプションの例: https://codepen.io/qrac/pen/OJELabK

## About

任意のコンテンツをループスライドさせる 2KB のシンプルな JavaScript ライブラリ。ウェブデザインの装飾を想定しています。

- ループ要素の種類 / サイズ / 数に制限なし
- ターゲット要素のリサイズに合わせて自動調整
- 横方向 / 縦方向 / 各逆ループ / 速度調整に対応

## How To Use

### HTML

HTML に `data-showloop`・`data-showloop-slide`・`data-showloop-items` を付与して、`<!-- ADD CONTENTS -->` にループさせたいコンテンツを入れます。コンテンツは複数でも構いません。

```html
<div data-showloop>
  <div data-showloop-slide>
    <div data-showloop-items>
      <!-- ADD CONTENTS -->
    </div>
  </div>
</div>
```

### JavaScript

[CDN](https://www.jsdelivr.com/package/npm/showloop) または [npm](https://www.npmjs.com/package/showloop) から JavaScript を読み込みます。

#### UMD

<!-- prettier-ignore -->
```html
<script src="https://cdn.jsdelivr.net/npm/showloop@0.1.0/dist/showloop.js"></script>
<script>showloop()</script>
```

#### ESM

<!-- prettier-ignore -->
```html
<script type="module">
  import showloop from "https://cdn.jsdelivr.net/npm/showloop@0.1.0/dist/showloop.esm.js"
  showloop()
</script>
```

```ts
import showloop from "showloop"

showloop()
```

## Options

オプションは初期化関数に `showloop({key: value})` 形式で使うか、または各 HTML に `data-showloop='{ "key": "value" }'` 形式で渡せます。HTML の場合、`key` をダブルクォーテーションで囲まないと内部処理の `JSON.parse()` が失敗してエラーになります。

| Option           | Type                    | Default             |
| ---------------- | ----------------------- | ------------------- |
| `axis`           | `"X" or "Y"`            | `"X"`               |
| `direction`      | `"normal" or "reverse"` | `"normal"`          |
| `speed`          | `number`                | `3000`              |
| `targetSelector` | `string`                | `"[data-showloop]"` |
| `useLimit`       | `boolean`               | `true`              |

### axis

`"X"` だと横方向 `"Y"` だと縦方向に要素をループスライドさせます。

### direction

`"normal"` だと通常 `"reverse"` だと逆方向に要素をループスライドさせます。

### speed

`data-showloop-items` 内の要素がループする時間をミリ秒で設定できます。

### targetSelector

`[data-showloop]` とは別にターゲットを設定できます。1 画面で異なるオプションの初期化関数を複数使いたい場合に使います。

```html
<div class="test1" data-showloop>...</div>
<div class="test2" data-showloop>...</div>

<script type="module">
  import showloop from "./showloop.esm.js"

  showloop({
    targetSelector: ".test1",
    speed: 1000,
  })
  showloop({
    targetSelector: ".test2",
    speed: 2000,
  })
</script>
```

### useLimit (⚠️danger)

デフォルト `true` ではループ要素を複製する限界が設定されており、画面幅の 2 倍以上は増えません。使用上、このリミッターを外したい場合のみ `false` にします。

※注意するべきは縦ループです。ウェブは基本的に縦幅の制約が無いため、リミッターを外した状態で `height` または `max-height` に値がない要素内をループさせると、縦幅の計算と複製が無限ループしてブラウザがクラッシュします。

## License

- MIT

## Credit

- Author: [Qrac](https://qrac.jp)
- Organization: [QRANOKO](https://qranoko.jp)
