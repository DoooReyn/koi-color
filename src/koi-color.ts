import { Koi, KoiPlugin } from "koi-core";
import { Color } from "cc";
import { KOI_COLOR } from "./koi-typings";

@Koi.Reg("Color")
export class KoiColor extends KoiPlugin {
    override readonly name = "Koi.Plugin.Color";
    override readonly version = "1.0.0";
    override readonly description = "色值转换插件";
    override readonly author = "Koi Team | DoooReyn";

    override onAttach() {
        this.from(KOI_COLOR.WHITE);
        this.from(KOI_COLOR.BLACK);
        this.from(KOI_COLOR.BLUE);
        this.from(KOI_COLOR.DARK_BLUE);
        this.from(KOI_COLOR.GREEN);
        this.from(KOI_COLOR.DARK_GREEN);
        this.from(KOI_COLOR.RED);
        this.from(KOI_COLOR.DARK_RED);
        this.from(KOI_COLOR.YELLOW);
        this.from(KOI_COLOR.ORANGE);
        this.from(KOI_COLOR.PURPLE);
        this.from(KOI_COLOR.GOLD);
        this.from(KOI_COLOR.SILVER);
        this.from(KOI_COLOR.GRAY);
    }

    override onDetach() {}

    /** 色值缓存 */
    private cache: { [key: string | symbol]: Color } = Object.create(null);

    /**
     * 色值转换
     * @param r 色值(通道 R)
     * @param g 通道 G
     * @param b 通道 B
     * @param a 通道 A
     */
    from(r: Color | string | number[] | number, g?: number, b?: number, a?: number): Color {
        if (typeof r === "string") {
            let color = this.cache[r];
            if (!color) {
                this.cache[r] = Color.fromHEX(new Color(), r);
            }
            return color;
        } else if (typeof r === "number") {
            g ??= 255;
            b ??= 255;
            const colors = [r, g, b];
            if (a != undefined) colors[3] = a;
            const hex = "#" + colors.map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
            return this.from(hex);
        } else if (Array.isArray(r)) {
            let [rr, gg, bb, aa] = r;
            rr ??= 255;
            gg ??= 255;
            bb ??= 255;
            const colors = [rr, gg, bb];
            if (aa != undefined) colors[3] = aa;
            const hex = "#" + colors.map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
            return this.from(hex);
        } else {
            return r.clone();
        }
    }
}
