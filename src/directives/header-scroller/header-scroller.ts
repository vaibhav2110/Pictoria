import { Directive,ElementRef, OnInit} from '@angular/core';

/**
 * Generated class for the HeaderScrollerDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[header-scroller]' // Attribute selector
})
export class HeaderScrollerDirective implements OnInit{
 /**
 * @var number Distance from page top to trigger the hide/show functionality.
	 */
	private triggerDistance: number = 100;

	/**
	 * @var string Distance to keep between the top and the content when the header is hidden.
	 */
	private marginTop: string = '10px';

	/**
	 * @var number Animation transition, in seconds, for showing/hiding the header.
	 */
	private transition: number = 0.6;

	/**
	 * @var number The last value of scrollTop.
	 */
	private lastScrollTop: number = null;

	/**
	 * @var HTMLElement Content element (<ion-content>).
	 */
	private el: HTMLElement;

	/**
	 * Initializes.
	 *
	 * @param el ElementRef Directive's selector.
	 * @return void
	 */
	constructor(el: ElementRef) {
		this.el = el.nativeElement;
	}

	/**
	 * Binds the scroller.
	 *
	 * @return void
	 */
	public ngOnInit() {
		let el = this.el;
		let prevEl = el && <HTMLElement>el.previousElementSibling;
		let style = prevEl && prevEl.style;
		let children = el && el.children;
		let childList = children && <Array<HTMLElement>>Array.from(children);

		if (style) {
			// Set animation transition
			style.transition = `top ${this.transition}s ease-in-out`;
		}
		
		let scrollList = (childList || []).filter(e => e.classList.contains('scroll-content'));
		let scroll = scrollList.length ? scrollList[0] : null;

		if (scroll) {
			this.bindScroller(scroll);
		}
	}

	/**
	 * Listen to scroll events in <scroll-content> component.
	 *
	 * @param el HTMLElement Scroller element (<scroll-content>).
	 * @return void
	 */
	private bindScroller(el: HTMLElement): void {
		el.addEventListener('scroll', event => {
			let scroller = <HTMLElement>event.target;
			let header = <HTMLElement>scroller.parentElement.previousElementSibling;
			let scrollTop = scroller.scrollTop;
			let headerStyle = header.style;
			let headerTop = parseInt(headerStyle.top);
			let offsetHeight = header.offsetHeight;
			let scrollerStyle = scroller.style;
			let lastScrollTop = this.lastScrollTop || 0;
			
			let show = ((scrollTop <= this.triggerDistance) || (scrollTop < lastScrollTop));
			show = show && (headerTop < 0);
			let hide = ((isNaN(headerTop) || (headerTop >= 0)) && (scrollTop > this.triggerDistance));
			hide = hide && (scrollTop > lastScrollTop);
			
			if (show) {
				headerStyle.top = '0';
				scrollerStyle.marginTop = `${offsetHeight}px`;
			} else if (hide) {
				scrollerStyle.marginTop = this.marginTop;
				headerStyle.top = `-${offsetHeight}px`;
			}
			
			this.lastScrollTop = scrollTop;
		});
	}

}
