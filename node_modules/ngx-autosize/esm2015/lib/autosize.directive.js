/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ElementRef, HostListener, Directive, Input, NgZone } from '@angular/core';
/** @type {?} */
const MAX_LOOKUP_RETRIES = 3;
export class AutosizeDirective {
    /**
     * @param {?} element
     * @param {?} _zone
     */
    constructor(element, _zone) {
        this.element = element;
        this._zone = _zone;
        this.onlyGrow = false;
        this.useImportant = false;
        this.retries = 0;
        this._destroyed = false;
        if (this.element.nativeElement.tagName !== 'TEXTAREA') {
            this._findNestedTextArea();
        }
        else {
            this.textAreaEl = this.element.nativeElement;
            this.textAreaEl.style.overflow = 'hidden';
            this._onTextAreaFound();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minRows(value) {
        this._minRows = value;
        if (this.textAreaEl) {
            this.textAreaEl.rows = value;
        }
    }
    ;
    /**
     * @param {?} textArea
     * @return {?}
     */
    onInput(textArea) {
        this.adjust();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyed = true;
        if (this._windowResizeHandler) {
            window.removeEventListener('resize', this._windowResizeHandler, false);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.adjust();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.adjust(true);
    }
    /**
     * @return {?}
     */
    _findNestedTextArea() {
        this.textAreaEl = this.element.nativeElement.querySelector('TEXTAREA');
        if (!this.textAreaEl && this.element.nativeElement.shadowRoot) {
            this.textAreaEl = this.element.nativeElement.shadowRoot.querySelector('TEXTAREA');
        }
        if (!this.textAreaEl) {
            if (this.retries >= MAX_LOOKUP_RETRIES) {
                console.warn('ngx-autosize: textarea not found');
            }
            else {
                this.retries++;
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this._findNestedTextArea();
                }), 100);
            }
            return;
        }
        this.textAreaEl.style.overflow = 'hidden';
        this._onTextAreaFound();
    }
    /**
     * @return {?}
     */
    _onTextAreaFound() {
        this._addWindowResizeHandler();
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.adjust();
        }));
    }
    /**
     * @return {?}
     */
    _addWindowResizeHandler() {
        this._windowResizeHandler = Debounce((/**
         * @return {?}
         */
        () => {
            this._zone.run((/**
             * @return {?}
             */
            () => {
                this.adjust();
            }));
        }), 200);
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            window.addEventListener('resize', this._windowResizeHandler, false);
        }));
    }
    /**
     * @param {?=} inputsChanged
     * @return {?}
     */
    adjust(inputsChanged = false) {
        if (!this._destroyed && this.textAreaEl) {
            /** @type {?} */
            const currentText = this.textAreaEl.value;
            if (inputsChanged === false &&
                currentText === this._oldContent &&
                this.textAreaEl.offsetWidth === this._oldWidth) {
                return;
            }
            this._oldContent = currentText;
            this._oldWidth = this.textAreaEl.offsetWidth;
            /** @type {?} */
            const clone = this.textAreaEl.cloneNode(true);
            /** @type {?} */
            const parent = this.textAreaEl.parentNode;
            clone.style.width = this.textAreaEl.offsetWidth + 'px';
            clone.style.visibility = 'hidden';
            clone.style.position = 'absolute';
            clone.textContent = currentText;
            parent.appendChild(clone);
            clone.style.overflow = 'auto';
            clone.style.height = 'auto';
            /** @type {?} */
            let height = clone.scrollHeight;
            // add into height top and bottom borders' width
            /** @type {?} */
            let computedStyle = window.getComputedStyle(clone, null);
            height += parseInt(computedStyle.getPropertyValue('border-top-width'));
            height += parseInt(computedStyle.getPropertyValue('border-bottom-width'));
            /** @type {?} */
            const oldHeight = this.textAreaEl.offsetHeight;
            /** @type {?} */
            const willGrow = height > oldHeight;
            if (this.onlyGrow === false || willGrow) {
                /** @type {?} */
                const lineHeight = this._getLineHeight();
                /** @type {?} */
                const rowsCount = height / lineHeight;
                if (this._minRows && this._minRows >= rowsCount) {
                    height = this._minRows * lineHeight;
                }
                else if (this.maxRows && this.maxRows <= rowsCount) {
                    // never shrink the textarea if onlyGrow is true
                    /** @type {?} */
                    const maxHeight = this.maxRows * lineHeight;
                    height = this.onlyGrow ? Math.max(maxHeight, oldHeight) : maxHeight;
                    this.textAreaEl.style.overflow = 'auto';
                }
                else {
                    this.textAreaEl.style.overflow = 'hidden';
                }
                /** @type {?} */
                let heightStyle = height + 'px';
                heightStyle += this.useImportant ? ' !important' : '';
                this.textAreaEl.style.height = heightStyle;
            }
            parent.removeChild(clone);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _getLineHeight() {
        /** @type {?} */
        let lineHeight = parseInt(this.textAreaEl.style.lineHeight, 10);
        if (isNaN(lineHeight) && window.getComputedStyle) {
            /** @type {?} */
            const styles = window.getComputedStyle(this.textAreaEl);
            lineHeight = parseInt(styles.lineHeight, 10);
        }
        if (isNaN(lineHeight)) {
            /** @type {?} */
            const fontSize = window.getComputedStyle(this.textAreaEl, null).getPropertyValue('font-size');
            lineHeight = Math.floor(parseInt(fontSize.replace('px', ''), 10) * 1.5);
        }
        return lineHeight;
    }
}
AutosizeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[autosize]'
            },] }
];
/** @nocollapse */
AutosizeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
AutosizeDirective.propDecorators = {
    minRows: [{ type: Input }],
    maxRows: [{ type: Input }],
    onlyGrow: [{ type: Input }],
    useImportant: [{ type: Input }],
    onInput: [{ type: HostListener, args: ['input', ['$event.target'],] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AutosizeDirective.prototype._minRows;
    /** @type {?} */
    AutosizeDirective.prototype.maxRows;
    /** @type {?} */
    AutosizeDirective.prototype.onlyGrow;
    /** @type {?} */
    AutosizeDirective.prototype.useImportant;
    /**
     * @type {?}
     * @private
     */
    AutosizeDirective.prototype.retries;
    /**
     * @type {?}
     * @private
     */
    AutosizeDirective.prototype.textAreaEl;
    /**
     * @type {?}
     * @private
     */
    AutosizeDirective.prototype._oldContent;
    /**
     * @type {?}
     * @private
     */
    AutosizeDirective.prototype._oldWidth;
    /**
     * @type {?}
     * @private
     */
    AutosizeDirective.prototype._windowResizeHandler;
    /**
     * @type {?}
     * @private
     */
    AutosizeDirective.prototype._destroyed;
    /** @type {?} */
    AutosizeDirective.prototype.element;
    /**
     * @type {?}
     * @private
     */
    AutosizeDirective.prototype._zone;
    /* Skipping unhandled member: ;*/
}
/**
 * @param {?} func
 * @param {?} wait
 * @param {?=} immediate
 * @return {?}
 */
function Debounce(func, wait, immediate = false) {
    /** @type {?} */
    let timeout;
    return (/**
     * @return {?}
     */
    function () {
        /** @type {?} */
        const context = this;
        /** @type {?} */
        const args = arguments;
        /** @type {?} */
        const later = (/**
         * @return {?}
         */
        function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        });
        /** @type {?} */
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NpemUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF1dG9zaXplLyIsInNvdXJjZXMiOlsibGliL2F1dG9zaXplLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFVBQVUsRUFDVixZQUFZLEVBQ1osU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ1QsTUFBTSxlQUFlLENBQUM7O01BRWpCLGtCQUFrQixHQUFHLENBQUM7QUFNNUIsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7SUE0QjFCLFlBQ1csT0FBbUIsRUFDbEIsS0FBYTtRQURkLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbEIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQW5CaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUV0QixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBT1osZUFBVSxHQUFHLEtBQUssQ0FBQztRQVd2QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7WUFDbkQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FFOUI7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUMxQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7Ozs7O0lBdkNELElBQ0ksT0FBTyxDQUFDLEtBQUs7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUFBLENBQUM7Ozs7O0lB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QUksQ0FBQztZQUNmLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDN0I7UUFDTCxDQUFDLENBQUE7O2NBQ0ssT0FBTyxHQUFHLFNBQVMsSUFBSSxDQUFDLE9BQU87UUFDckMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDLEVBQUM7QUFDTixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBFbGVtZW50UmVmLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBEaXJlY3RpdmUsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50Q2hlY2tlZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3QgTUFYX0xPT0tVUF9SRVRSSUVTID0gMztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbYXV0b3NpemVdJ1xufSlcblxuZXhwb3J0IGNsYXNzIEF1dG9zaXplRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudENoZWNrZWQge1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IG1pblJvd3ModmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbWluUm93cyA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy50ZXh0QXJlYUVsKSB7XG4gICAgICAgICAgICB0aGlzLnRleHRBcmVhRWwucm93cyA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBwcml2YXRlIF9taW5Sb3dzOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBtYXhSb3dzOiBudW1iZXI7XG4gICAgQElucHV0KCkgb25seUdyb3cgPSBmYWxzZTtcbiAgICBASW5wdXQoKSB1c2VJbXBvcnRhbnQgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgcmV0cmllcyA9IDA7XG4gICAgcHJpdmF0ZSB0ZXh0QXJlYUVsOiBhbnk7XG5cbiAgICBwcml2YXRlIF9vbGRDb250ZW50OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfb2xkV2lkdGg6IG51bWJlcjtcblxuICAgIHByaXZhdGUgX3dpbmRvd1Jlc2l6ZUhhbmRsZXI7XG4gICAgcHJpdmF0ZSBfZGVzdHJveWVkID0gZmFsc2U7XG5cbiAgICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50LnRhcmdldCddKVxuICAgIG9uSW5wdXQodGV4dEFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGp1c3QoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZVxuICAgICkge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGFnTmFtZSAhPT0gJ1RFWFRBUkVBJykge1xuICAgICAgICAgICAgdGhpcy5fZmluZE5lc3RlZFRleHRBcmVhKCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGV4dEFyZWFFbCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy50ZXh0QXJlYUVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB0aGlzLl9vblRleHRBcmVhRm91bmQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5fd2luZG93UmVzaXplSGFuZGxlcikge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3dpbmRvd1Jlc2l6ZUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAgICAgdGhpcy5hZGp1c3QoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuYWRqdXN0KHRydWUpO1xuICAgIH1cblxuICAgIF9maW5kTmVzdGVkVGV4dEFyZWEoKSB7XG4gICAgICAgIHRoaXMudGV4dEFyZWFFbCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1RFWFRBUkVBJyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnRleHRBcmVhRWwgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdCkge1xuICAgICAgICAgICAgdGhpcy50ZXh0QXJlYUVsID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdURVhUQVJFQScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnRleHRBcmVhRWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJldHJpZXMgPj0gTUFYX0xPT0tVUF9SRVRSSUVTKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCduZ3gtYXV0b3NpemU6IHRleHRhcmVhIG5vdCBmb3VuZCcpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmV0cmllcysrO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kTmVzdGVkVGV4dEFyZWEoKTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50ZXh0QXJlYUVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgIHRoaXMuX29uVGV4dEFyZWFGb3VuZCgpO1xuXG4gICAgfVxuXG4gICAgX29uVGV4dEFyZWFGb3VuZCgpIHtcbiAgICAgICAgdGhpcy5fYWRkV2luZG93UmVzaXplSGFuZGxlcigpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRqdXN0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9hZGRXaW5kb3dSZXNpemVIYW5kbGVyKCkge1xuICAgICAgICB0aGlzLl93aW5kb3dSZXNpemVIYW5kbGVyID0gRGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl93aW5kb3dSZXNpemVIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkanVzdChpbnB1dHNDaGFuZ2VkID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kZXN0cm95ZWQgJiYgdGhpcy50ZXh0QXJlYUVsKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUZXh0ID0gdGhpcy50ZXh0QXJlYUVsLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5wdXRzQ2hhbmdlZCA9PT0gZmFsc2UgJiZcbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dCA9PT0gdGhpcy5fb2xkQ29udGVudCAmJlxuICAgICAgICAgICAgICAgIHRoaXMudGV4dEFyZWFFbC5vZmZzZXRXaWR0aCA9PT0gdGhpcy5fb2xkV2lkdGhcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fb2xkQ29udGVudCA9IGN1cnJlbnRUZXh0O1xuICAgICAgICAgICAgdGhpcy5fb2xkV2lkdGggPSB0aGlzLnRleHRBcmVhRWwub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgICAgIGNvbnN0IGNsb25lID0gdGhpcy50ZXh0QXJlYUVsLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMudGV4dEFyZWFFbC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgY2xvbmUuc3R5bGUud2lkdGggPSB0aGlzLnRleHRBcmVhRWwub2Zmc2V0V2lkdGggKyAncHgnO1xuICAgICAgICAgICAgY2xvbmUuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgY2xvbmUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgY2xvbmUudGV4dENvbnRlbnQgPSBjdXJyZW50VGV4dDtcblxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGNsb25lKTtcblxuICAgICAgICAgICAgY2xvbmUuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7XG4gICAgICAgICAgICBjbG9uZS5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG5cbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSBjbG9uZS5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgICAgIC8vIGFkZCBpbnRvIGhlaWdodCB0b3AgYW5kIGJvdHRvbSBib3JkZXJzJyB3aWR0aFxuICAgICAgICAgICAgbGV0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjbG9uZSwgbnVsbCk7XG4gICAgICAgICAgICBoZWlnaHQgKz0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdib3JkZXItdG9wLXdpZHRoJykpO1xuICAgICAgICAgICAgaGVpZ2h0ICs9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnYm9yZGVyLWJvdHRvbS13aWR0aCcpKTtcblxuICAgICAgICAgICAgY29uc3Qgb2xkSGVpZ2h0ID0gdGhpcy50ZXh0QXJlYUVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IHdpbGxHcm93ID0gaGVpZ2h0ID4gb2xkSGVpZ2h0O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vbmx5R3JvdyA9PT0gZmFsc2UgfHwgd2lsbEdyb3cpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lSGVpZ2h0ID0gdGhpcy5fZ2V0TGluZUhlaWdodCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvd3NDb3VudCA9IGhlaWdodCAvIGxpbmVIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWluUm93cyAmJiB0aGlzLl9taW5Sb3dzID49IHJvd3NDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSB0aGlzLl9taW5Sb3dzICogbGluZUhlaWdodDtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXhSb3dzICYmIHRoaXMubWF4Um93cyA8PSByb3dzQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbmV2ZXIgc2hyaW5rIHRoZSB0ZXh0YXJlYSBpZiBvbmx5R3JvdyBpcyB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1heEhlaWdodCA9IHRoaXMubWF4Um93cyAqIGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IHRoaXMub25seUdyb3cgPyBNYXRoLm1heChtYXhIZWlnaHQsIG9sZEhlaWdodCk6IG1heEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0QXJlYUVsLnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0QXJlYUVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGhlaWdodFN0eWxlID0gaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgICAgICBoZWlnaHRTdHlsZSArPSB0aGlzLnVzZUltcG9ydGFudCA/ICcgIWltcG9ydGFudCcgOiAnJztcblxuICAgICAgICAgICAgICAgIHRoaXMudGV4dEFyZWFFbC5zdHlsZS5oZWlnaHQgPSBoZWlnaHRTdHlsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGNsb25lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldExpbmVIZWlnaHQoKSB7XG4gICAgICAgIGxldCBsaW5lSGVpZ2h0ID0gcGFyc2VJbnQodGhpcy50ZXh0QXJlYUVsLnN0eWxlLmxpbmVIZWlnaHQsIDEwKTtcbiAgICAgICAgaWYgKGlzTmFOKGxpbmVIZWlnaHQpICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnRleHRBcmVhRWwpO1xuICAgICAgICAgICAgbGluZUhlaWdodCA9IHBhcnNlSW50KHN0eWxlcy5saW5lSGVpZ2h0LCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4obGluZUhlaWdodCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvbnRTaXplID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy50ZXh0QXJlYUVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdmb250LXNpemUnKTtcbiAgICAgICAgICAgIGxpbmVIZWlnaHQgPSBNYXRoLmZsb29yKHBhcnNlSW50KGZvbnRTaXplLnJlcGxhY2UoJ3B4JywgJycpLCAxMCkgKiAxLjUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxpbmVIZWlnaHQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBEZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUgPSBmYWxzZSkge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzO1xuICAgICAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICBjb25zdCBsYXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19