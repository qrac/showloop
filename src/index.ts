export type Options = {
  axis?: "X" | "Y"
  direction?: "normal" | "reverse"
  speed?: number
  targetSelector?: string
  useLimit?: boolean
}
type ResolvedOptions = Required<Options>

type ShowloopElement = {
  stage: HTMLElement
  slide: HTMLElement
  items: HTMLElement
}

const defaultOptions: ResolvedOptions = {
  axis: "X",
  direction: "normal",
  speed: 3000,
  targetSelector: "[data-showloop]",
  useLimit: true,
}

const config = {
  stageAttr: "data-showloop",
  slideAttr: "data-showloop-slide",
  itemsAttr: "data-showloop-items",
}

function mount(el: ShowloopElement, options: ResolvedOptions) {
  const optionData = el.stage.getAttribute(config.stageAttr)
  const contentOption = optionData ? JSON.parse(optionData) : {}
  const resolvedOptions: ResolvedOptions = {
    ...options,
    ...contentOption,
  }
  const { axis, direction, speed, useLimit } = resolvedOptions

  el.stage.style.overflow = "hidden"
  el.stage.style.display = "flex"
  el.slide.style.display = "flex"

  if (axis === "Y") {
    el.slide.style.flexDirection = "column"
  }

  let limitSize = 0
  let stageSize = 0
  let slideSize = 0
  let itemsSize = 0
  let wantItems = 0
  let cloneItems = 0
  let needItems = 0

  function setup(contentSize: number) {
    limitSize = axis === "X" ? window.innerWidth * 2 : window.innerHeight * 2
    stageSize = contentSize
    slideSize = axis === "X" ? el.slide.scrollWidth : el.slide.scrollHeight
    itemsSize = axis === "X" ? el.items.scrollWidth : el.items.scrollHeight
    wantItems = Math.ceil((stageSize * 2) / itemsSize)
    cloneItems =
      [...el.slide.querySelectorAll(`[${config.itemsAttr}]`)].length - 1
    needItems = slideSize >= limitSize ? 0 : wantItems - cloneItems
    needItems = useLimit ? needItems : wantItems - cloneItems

    for (let step = 0; step < needItems; step++) {
      const clone = el.items.cloneNode(true)
      el.slide.appendChild(clone)
    }

    const addedSlideSize =
      axis === "X" ? el.slide.scrollWidth : el.slide.scrollHeight
    const overSize = addedSlideSize - stageSize
    const start = direction === "normal" ? 0 : -1 * overSize
    const end =
      direction === "normal" ? -1 * itemsSize : -1 * (overSize - itemsSize)

    el.slide.animate(
      {
        transform: [
          `translate${axis}(${start}px)`,
          `translate${axis}(${end}px)`,
        ],
      },
      {
        iterations: Infinity,
        duration: speed,
      }
    )
  }
  setup(el.stage.clientWidth)

  const resizeObserver = new ResizeObserver((entries) => {
    const contentSize =
      axis === "X"
        ? entries[0].contentRect.width
        : entries[0].contentRect.height
    const term = 500

    let timer = 0

    clearTimeout(timer)

    timer = window.setTimeout(function () {
      if (contentSize !== stageSize) {
        console.log("resize")
        setup(contentSize)
      }
    }, term)
  })
  resizeObserver.observe(el.stage)
}

function showloop(options: Options = {}) {
  const resolvedOptions: ResolvedOptions = {
    ...defaultOptions,
    ...options,
  }
  const targets = [
    ...document.querySelectorAll<HTMLElement>(resolvedOptions.targetSelector),
  ]

  if (!targets.length) {
    return
  }

  targets.map((target) => {
    const stage = target.hasAttribute(config.stageAttr)
      ? target
      : target.querySelector<HTMLElement>(`[${config.stageAttr}]`)
    const slide = target.querySelector<HTMLElement>(`[${config.slideAttr}]`)
    const items = target.querySelector<HTMLElement>(`[${config.itemsAttr}]`)

    if (stage && slide && items) {
      return mount({ stage, slide, items }, resolvedOptions)
    }
    return
  })
}

export default showloop
