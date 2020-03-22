/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ElementRef, HostListener, Directive, Input, NgZone } from '@angular/core';
/** @type {?} */
var MAX_LOOKUP_RETRIES = 3;
var AutosizeDirective = /** @class */ (function () {
    function AutosizeDirective(element, _zone) {
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
    Object.defineProperty(AutosizeDirective.prototype, "minRows", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._minRows = value;
            if (this.textAreaEl) {
                this.textAreaEl.rows = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * @param {?} textArea
     * @return {?}
     */
    AutosizeDirective.prototype.onInput = /**
     * @param {?} textArea
     * @return {?}
     */
    function (textArea) {
        this.adjust();
    };
    /**
     * @return {?}
     */
    AutosizeDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyed = true;
        if (this._windowResizeHandler) {
            window.removeEventListener('resize', this._windowResizeHandler, false);
        }
    };
    /**
     * @return {?}
     */
    AutosizeDirective.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        this.adjust();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AutosizeDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.adjust(true);
    };
    /**
     * @return {?}
     */
    AutosizeDirective.prototype._findNestedTextArea = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
                function () {
                    _this._findNestedTextArea();
                }), 100);
            }
            return;
        }
        this.textAreaEl.style.overflow = 'hidden';
        this._onTextAreaFound();
    };
    /**
     * @return {?}
     */
    AutosizeDirective.prototype._onTextAreaFound = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._addWindowResizeHandler();
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.adjust();
        }));
    };
    /**
     * @return {?}
     */
    AutosizeDirective.prototype._addWindowResizeHandler = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._windowResizeHandler = Debounce((/**
         * @return {?}
         */
        function () {
            _this._zone.run((/**
             * @return {?}
             */
            function () {
                _this.adjust();
            }));
        }), 200);
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            window.addEventListener('resize', _this._windowResizeHandler, false);
        }));
    };
    /**
     * @param {?=} inputsChanged
     * @return {?}
     */
    AutosizeDirective.prototype.adjust = /**
     * @param {?=} inputsChanged
     * @return {?}
     */
    function (inputsChanged) {
        if (inputsChanged === void 0) { inputsChanged = false; }
        if (!this._destroyed && this.textAreaEl) {
            /** @type {?} */
            var currentText = this.textAreaEl.value;
            if (inputsChanged === false &&
                currentText === this._oldContent &&
                this.textAreaEl.offsetWidth === this._oldWidth) {
                return;
            }
            this._oldContent = currentText;
            this._oldWidth = this.textAreaEl.offsetWidth;
            /** @type {?} */
            var clone = this.textAreaEl.cloneNode(true);
            /** @type {?} */
            var parent_1 = this.textAreaEl.parentNode;
            clone.style.width = this.textAreaEl.offsetWidth + 'px';
            clone.style.visibility = 'hidden';
            clone.style.position = 'absolute';
            clone.textContent = currentText;
            parent_1.appendChild(clone);
            clone.style.overflow = 'auto';
            clone.style.height = 'auto';
            /** @type {?} */
            var height = clone.scrollHeight;
            // add into height top and bottom borders' width
            /** @type {?} */
            var computedStyle = window.getComputedStyle(clone, null);
            height += parseInt(computedStyle.getPropertyValue('border-top-width'));
            height += parseInt(computedStyle.getPropertyValue('border-bottom-width'));
            /** @type {?} */
            var oldHeight = this.textAreaEl.offsetHeight;
            /** @type {?} */
            var willGrow = height > oldHeight;
            if (this.onlyGrow === false || willGrow) {
                /** @type {?} */
                var lineHeight = this._getLineHeight();
                /** @type {?} */
                var rowsCount = height / lineHeight;
                if (this._minRows && this._minRows >= rowsCount) {
                    height = this._minRows * lineHeight;
                }
                else if (this.maxRows && this.maxRows <= rowsCount) {
                    // never shrink the textarea if onlyGrow is true
                    /** @type {?} */
                    var maxHeight = this.maxRows * lineHeight;
                    height = this.onlyGrow ? Math.max(maxHeight, oldHeight) : maxHeight;
                    this.textAreaEl.style.overflow = 'auto';
                }
                else {
                    this.textAreaEl.style.overflow = 'hidden';
                }
                /** @type {?} */
                var heightStyle = height + 'px';
                heightStyle += this.useImportant ? ' !important' : '';
                this.textAreaEl.style.height = heightStyle;
            }
            parent_1.removeChild(clone);
        }
    };
    /**
     * @private
     * @return {?}
     */
    AutosizeDirective.prototype._getLineHeight = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lineHeight = parseInt(this.textAreaEl.style.lineHeight, 10);
        if (isNaN(lineHeight) && window.getComputedStyle) {
            /** @type {?} */
            var styles = window.getComputedStyle(this.textAreaEl);
            lineHeight = parseInt(styles.lineHeight, 10);
        }
        if (isNaN(lineHeight)) {
            /** @type {?} */
            var fontSize = window.getComputedStyle(this.textAreaEl, null).getPropertyValue('font-size');
            lineHeight = Math.floor(parseInt(fontSize.replace('px', ''), 10) * 1.5);
        }
        return lineHeight;
    };
    AutosizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[autosize]'
                },] }
    ];
    /** @nocollapse */
    AutosizeDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    AutosizeDirective.propDecorators = {
        minRows: [{ type: Input }],
        maxRows: [{ type: Input }],
        onlyGrow: [{ type: Input }],
        useImportant: [{ type: Input }],
        onInput: [{ type: HostListener, args: ['input', ['$event.target'],] }]
    };
    return AutosizeDirective;
}());
export { AutosizeDirective };
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
function Debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    /** @type {?} */
    var timeout;
    return (/**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var context = this;
        /** @type {?} */
        var args = arguments;
        /** @type {?} */
        var later = (/**
         * @return {?}
         */
        function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        });
        /** @type {?} */
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NpemUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWF1dG9zaXplLyIsInNvdXJjZXMiOlsibGliL2F1dG9zaXplLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFVBQVUsRUFDVixZQUFZLEVBQ1osU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ1QsTUFBTSxlQUFlLENBQUM7O0lBRWpCLGtCQUFrQixHQUFHLENBQUM7QUFFNUI7SUFnQ0ksMkJBQ1csT0FBbUIsRUFDbEIsS0FBYTtRQURkLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbEIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQW5CaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUV0QixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBT1osZUFBVSxHQUFHLEtBQUssQ0FBQztRQVd2QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7WUFDbkQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FFOUI7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUMxQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUF2Q0Qsc0JBQ0ksc0NBQU87Ozs7O1FBRFgsVUFDWSxLQUFLO1lBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7YUFDaEM7UUFDTCxDQUFDOzs7T0FBQTtJQUFBLENBQUM7Ozs7O0lBaUJGLG1D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aUI7SUFBakIsMEJBQUEsRUFBQSxpQkFBaUI7O1FBQ3ZDLE9BQU87SUFDWDs7O0lBQU87O1lBQ0csT0FBTyxHQUFHLElBQUk7O1lBQ2QsSUFBSSxHQUFHLFNBQVM7O1lBQ2hCLEtBQUs7OztRQUFHO1lBQ1YsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNmLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDN0I7UUFDTCxDQUFDLENBQUE7O1lBQ0ssT0FBTyxHQUFHLFNBQVMsSUFBSSxDQUFDLE9BQU87UUFDckMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDLEVBQUM7QUFDTixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBFbGVtZW50UmVmLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBEaXJlY3RpdmUsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50Q2hlY2tlZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3QgTUFYX0xPT0tVUF9SRVRSSUVTID0gMztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbYXV0b3NpemVdJ1xufSlcblxuZXhwb3J0IGNsYXNzIEF1dG9zaXplRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudENoZWNrZWQge1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IG1pblJvd3ModmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbWluUm93cyA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy50ZXh0QXJlYUVsKSB7XG4gICAgICAgICAgICB0aGlzLnRleHRBcmVhRWwucm93cyA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBwcml2YXRlIF9taW5Sb3dzOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBtYXhSb3dzOiBudW1iZXI7XG4gICAgQElucHV0KCkgb25seUdyb3cgPSBmYWxzZTtcbiAgICBASW5wdXQoKSB1c2VJbXBvcnRhbnQgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgcmV0cmllcyA9IDA7XG4gICAgcHJpdmF0ZSB0ZXh0QXJlYUVsOiBhbnk7XG5cbiAgICBwcml2YXRlIF9vbGRDb250ZW50OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfb2xkV2lkdGg6IG51bWJlcjtcblxuICAgIHByaXZhdGUgX3dpbmRvd1Jlc2l6ZUhhbmRsZXI7XG4gICAgcHJpdmF0ZSBfZGVzdHJveWVkID0gZmFsc2U7XG5cbiAgICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50LnRhcmdldCddKVxuICAgIG9uSW5wdXQodGV4dEFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGp1c3QoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZVxuICAgICkge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGFnTmFtZSAhPT0gJ1RFWFRBUkVBJykge1xuICAgICAgICAgICAgdGhpcy5fZmluZE5lc3RlZFRleHRBcmVhKCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGV4dEFyZWFFbCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy50ZXh0QXJlYUVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB0aGlzLl9vblRleHRBcmVhRm91bmQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5fd2luZG93UmVzaXplSGFuZGxlcikge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3dpbmRvd1Jlc2l6ZUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAgICAgdGhpcy5hZGp1c3QoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuYWRqdXN0KHRydWUpO1xuICAgIH1cblxuICAgIF9maW5kTmVzdGVkVGV4dEFyZWEoKSB7XG4gICAgICAgIHRoaXMudGV4dEFyZWFFbCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1RFWFRBUkVBJyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnRleHRBcmVhRWwgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdCkge1xuICAgICAgICAgICAgdGhpcy50ZXh0QXJlYUVsID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdURVhUQVJFQScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnRleHRBcmVhRWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJldHJpZXMgPj0gTUFYX0xPT0tVUF9SRVRSSUVTKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCduZ3gtYXV0b3NpemU6IHRleHRhcmVhIG5vdCBmb3VuZCcpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmV0cmllcysrO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kTmVzdGVkVGV4dEFyZWEoKTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50ZXh0QXJlYUVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgIHRoaXMuX29uVGV4dEFyZWFGb3VuZCgpO1xuXG4gICAgfVxuXG4gICAgX29uVGV4dEFyZWFGb3VuZCgpIHtcbiAgICAgICAgdGhpcy5fYWRkV2luZG93UmVzaXplSGFuZGxlcigpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRqdXN0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9hZGRXaW5kb3dSZXNpemVIYW5kbGVyKCkge1xuICAgICAgICB0aGlzLl93aW5kb3dSZXNpemVIYW5kbGVyID0gRGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl93aW5kb3dSZXNpemVIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkanVzdChpbnB1dHNDaGFuZ2VkID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kZXN0cm95ZWQgJiYgdGhpcy50ZXh0QXJlYUVsKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUZXh0ID0gdGhpcy50ZXh0QXJlYUVsLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5wdXRzQ2hhbmdlZCA9PT0gZmFsc2UgJiZcbiAgICAgICAgICAgICAgICBjdXJyZW50VGV4dCA9PT0gdGhpcy5fb2xkQ29udGVudCAmJlxuICAgICAgICAgICAgICAgIHRoaXMudGV4dEFyZWFFbC5vZmZzZXRXaWR0aCA9PT0gdGhpcy5fb2xkV2lkdGhcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fb2xkQ29udGVudCA9IGN1cnJlbnRUZXh0O1xuICAgICAgICAgICAgdGhpcy5fb2xkV2lkdGggPSB0aGlzLnRleHRBcmVhRWwub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgICAgIGNvbnN0IGNsb25lID0gdGhpcy50ZXh0QXJlYUVsLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMudGV4dEFyZWFFbC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgY2xvbmUuc3R5bGUud2lkdGggPSB0aGlzLnRleHRBcmVhRWwub2Zmc2V0V2lkdGggKyAncHgnO1xuICAgICAgICAgICAgY2xvbmUuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgY2xvbmUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgY2xvbmUudGV4dENvbnRlbnQgPSBjdXJyZW50VGV4dDtcblxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGNsb25lKTtcblxuICAgICAgICAgICAgY2xvbmUuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7XG4gICAgICAgICAgICBjbG9uZS5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG5cbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSBjbG9uZS5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgICAgIC8vIGFkZCBpbnRvIGhlaWdodCB0b3AgYW5kIGJvdHRvbSBib3JkZXJzJyB3aWR0aFxuICAgICAgICAgICAgbGV0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjbG9uZSwgbnVsbCk7XG4gICAgICAgICAgICBoZWlnaHQgKz0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdib3JkZXItdG9wLXdpZHRoJykpO1xuICAgICAgICAgICAgaGVpZ2h0ICs9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnYm9yZGVyLWJvdHRvbS13aWR0aCcpKTtcblxuICAgICAgICAgICAgY29uc3Qgb2xkSGVpZ2h0ID0gdGhpcy50ZXh0QXJlYUVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IHdpbGxHcm93ID0gaGVpZ2h0ID4gb2xkSGVpZ2h0O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vbmx5R3JvdyA9PT0gZmFsc2UgfHwgd2lsbEdyb3cpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lSGVpZ2h0ID0gdGhpcy5fZ2V0TGluZUhlaWdodCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvd3NDb3VudCA9IGhlaWdodCAvIGxpbmVIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWluUm93cyAmJiB0aGlzLl9taW5Sb3dzID49IHJvd3NDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSB0aGlzLl9taW5Sb3dzICogbGluZUhlaWdodDtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXhSb3dzICYmIHRoaXMubWF4Um93cyA8PSByb3dzQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbmV2ZXIgc2hyaW5rIHRoZSB0ZXh0YXJlYSBpZiBvbmx5R3JvdyBpcyB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1heEhlaWdodCA9IHRoaXMubWF4Um93cyAqIGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IHRoaXMub25seUdyb3cgPyBNYXRoLm1heChtYXhIZWlnaHQsIG9sZEhlaWdodCk6IG1heEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0QXJlYUVsLnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0QXJlYUVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGhlaWdodFN0eWxlID0gaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgICAgICBoZWlnaHRTdHlsZSArPSB0aGlzLnVzZUltcG9ydGFudCA/ICcgIWltcG9ydGFudCcgOiAnJztcblxuICAgICAgICAgICAgICAgIHRoaXMudGV4dEFyZWFFbC5zdHlsZS5oZWlnaHQgPSBoZWlnaHRTdHlsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGNsb25lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldExpbmVIZWlnaHQoKSB7XG4gICAgICAgIGxldCBsaW5lSGVpZ2h0ID0gcGFyc2VJbnQodGhpcy50ZXh0QXJlYUVsLnN0eWxlLmxpbmVIZWlnaHQsIDEwKTtcbiAgICAgICAgaWYgKGlzTmFOKGxpbmVIZWlnaHQpICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnRleHRBcmVhRWwpO1xuICAgICAgICAgICAgbGluZUhlaWdodCA9IHBhcnNlSW50KHN0eWxlcy5saW5lSGVpZ2h0LCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4obGluZUhlaWdodCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvbnRTaXplID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy50ZXh0QXJlYUVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdmb250LXNpemUnKTtcbiAgICAgICAgICAgIGxpbmVIZWlnaHQgPSBNYXRoLmZsb29yKHBhcnNlSW50KGZvbnRTaXplLnJlcGxhY2UoJ3B4JywgJycpLCAxMCkgKiAxLjUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxpbmVIZWlnaHQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBEZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUgPSBmYWxzZSkge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzO1xuICAgICAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICBjb25zdCBsYXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19