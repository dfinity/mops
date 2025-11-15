use candid_parser::utils::{service_compatible, CandidSource};
use serde::Serialize;
use serde_wasm_bindgen::to_value;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    // fn alert(s: &str);
}

type JsResult = Result<JsValue, JsError>;

fn js_return<T: Serialize + ?Sized>(value: &T) -> JsResult {
    to_value(value).map_err(|e| JsError::new(&format!("Serialization error ({})", e)))
}

#[wasm_bindgen(start)]
pub fn start() {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn is_candid_compatible(new_interface: &str, original_interface: &str) -> bool {
    service_compatible(
        CandidSource::Text(new_interface),
        CandidSource::Text(original_interface),
    )
    .is_ok()
}
