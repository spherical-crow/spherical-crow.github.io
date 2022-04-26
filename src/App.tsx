import React, { useState } from "react";
import "./App.css";

function App() {
  const [request, setRequest] = useState("");
  const [state, setState] = useState("");

  const IAM_TOKEN =
    "t1.9euelZqVkcqejJSYlMrOlIzKlc2OnO3rnpWaxo-dzJvGzsbIz5aZmMnHjsvl9PcXOmBs-e9cf2TB3fT3V2hdbPnvXH9kwQ.p6zAhMJNTRhzos6IXB5oFfSzWiE1NV59bKbEahxqncB9ybUnjtNYESq_f9lGFobl5dj02DOilvICPHSK9_RbDw";
  const folder_id = "b1g2ml07gjaao54gtn8t";
  const target_language = "ru";
  const texts = ["Hello", "World"];

  return (
    <>
      <section className="result-preview">
        <textarea
          className="original-news"
          placeholder="Скопируйте сюда текст новости"
          rows={10}
          cols={30}
        />
        <div className="frames">
          <div className="frames-line">
            Перетащите выбранные картинки в эту область
          </div>
          <div>
            <button className="save">Сохранить</button>
          </div>
        </div>
      </section>

      <section className="search-settings">
        <textarea
          className="request"
          placeholder="Введите фразы для поиска картинки"
          value={request}
          onChange={(e) => console.log(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              fetch(
                "https://translate.api.cloud.yandex.net/translate/v2/translate",
                {
                  // mode: "no-cors",
                  method: "POST",
                  headers: {
                    //"Access-Control-Allow-Origin": "*",
                    //    "Access-Control-Allow-Credentials": true,
                    // "Access-Control-Allow-Methods": "POST, GET",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${IAM_TOKEN}`,
                  },
                  body: JSON.stringify({
                    targetLanguageCode: target_language,
                    texts: texts,
                    folderId: folder_id,
                  }),
                },
              )
                .then((response) => {
                  console.log(response);
                  return response?.json();
                })
                .then((data) => {
                  console.log(data);
                  return setState(data ?? "nodata");
                })
                .catch((e) => console.log(e));
            }
          }}
          rows={4}
          cols={50}
        />
        <div>Настройки (поисковики, языки, слайдер минимального размера)</div>
      </section>

      <section className="search-result">
        Результаты
        <div>{state}</div>
      </section>
    </>
  );
}

export default App;
