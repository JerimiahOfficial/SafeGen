use serde::{Deserialize, Serialize};
use serde_wasm_bindgen::to_value;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::spawn_local;
use yew::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = ["window", "__TAURI__", "tauri"])]
    async fn invoke(cmd: &str, args: JsValue) -> JsValue;
}

#[derive(Serialize, Deserialize)]
struct GreetArgs<'a> {
    name: &'a str,
}

#[derive(Serialize, Deserialize)]
struct GeneratorArgs {
    length: u8,
    upper: bool,
    lower: bool,
    number: bool,
    symbol: bool,
}

#[function_component(App)]
pub fn app() -> Html {
    let password_input = use_node_ref();

    html! {
        <main>
            <input type="text" ref={password_input} id="Password" placeholder="Generated password" readonly=true />

            <div>
                <input type="button" value="Generate" id="Generate" /> // onclick={generate_password}
                <input type="button" value="Copy" id="Copy" /> // onclick={copy_password}
            </div>

            <label id="PassLen" for="length">{"Password Length: 10"}</label>
            <input id="length" type="range" min="10" max="50" value="10" class="slider" id="myRange" />

            <div>
                <label class="container">{"A-Z"}
                    <input type="checkbox" id="Upper" checked=true />
                    <span class="checkmark"></span>
                </label>

                <label class="container">{"a-z"}
                    <input type="checkbox" id="Lower" checked=true />
                    <span class="checkmark"></span>
                </label>

                <label class="container">{"0-9"}
                    <input type="checkbox" id="Number" checked=true />
                    <span class="checkmark"></span>
                </label>

                <label class="container">{"!@#$%^&*"}
                    <input type="checkbox" id="Symbol" checked=true />
                    <span class="checkmark"></span>
                </label>
            </div>

            <input type="image" src="public/github.svg" id="Github" />
        </main>
    }
}
