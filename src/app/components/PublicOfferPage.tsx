import { ArrowLeft } from "lucide-react";
import { Navbar } from "./Navbar";

export function PublicOfferPage() {
  return (
    <div
      className="min-h-screen film-grain"
      style={{
        background: "#050508",
        color: "rgba(255,255,255,0.9)",
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      <Navbar />
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        <a
          href="/"
          className="inline-flex items-center gap-2 mb-12 transition-colors hover:text-white"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "0.85rem",
            letterSpacing: "0.12em",
            color: "var(--c-cyan, #00E5FF)",
            textTransform: "uppercase",
          }}
        >
          <ArrowLeft size={16} />
          На главную
        </a>

        <h1
          className="gh-title"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            marginBottom: "8px",
            color: "white",
          }}
        >
          Публичная оферта
        </h1>
        <p
          style={{
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "40px",
          }}
        >
          Фестиваль GAMEHUB 2026 · 11–12 апреля · Арена Балуан Шолак, Алматы
        </p>

        <div
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.85,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          <section style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "0.08em",
                color: "var(--c-cyan, #00E5FF)",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              1. Общие положения
            </h2>
            <p>
              Настоящая публичная оферта (далее — «Оферта») является официальным предложением организатора фестиваля GAMEHUB 2026 (далее — «Организатор») любому физическому лицу (далее — «Участник») заключить договор на участие в мероприятии «GAMEHUB 2026 — Игровой и компьютерный клубный фестиваль» (далее — «Мероприятие»), проводимом 11–12 апреля 2026 года на арене «Балуан Шолак» в г. Алматы, Республика Казахстан.
            </p>
            <p style={{ marginTop: "12px" }}>
              Акцептом Оферты считается совершение Участником действий по регистрации на Мероприятие, получению билета или оплате участия в соответствии с условиями, размещёнными на официальном сайте Организатора.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "0.08em",
                color: "var(--c-cyan, #00E5FF)",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              2. Предмет оферты
            </h2>
            <p>
              Организатор обязуется предоставить Участнику право посещения Мероприятия в соответствии с выбранной категорией билета (бесплатный, VIP, пропуск креатора и т.д.), а Участник обязуется соблюдать правила проведения Мероприятия и действующее законодательство Республики Казахстан.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "0.08em",
                color: "var(--c-cyan, #00E5FF)",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              3. Регистрация и билеты
            </h2>
            <p>
              Регистрация на Мероприятие осуществляется через официальный сайт Организатора. Бесплатные билеты предоставляются в ограниченном количестве. Организатор вправе устанавливать лимиты на количество билетов, а также изменять условия регистрации без предварительного уведомления.
            </p>
            <p style={{ marginTop: "12px" }}>
              Билет является именным и даёт право однократного прохода на территорию Мероприятия в указанные даты. Передача билета третьим лицам без согласования с Организатором может повлечь отказ в допуске.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "0.08em",
                color: "var(--c-cyan, #00E5FF)",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              4. Возврат средств
            </h2>
            <p>
              В случае отмены или переноса Мероприятия по вине Организатора, Участникам, оплатившим платные билеты, производится полный возврат средств в порядке, определённом Организатором и платёжной системой.
            </p>
            <p style={{ marginTop: "12px" }}>
              При добровольном отказе Участника от посещения Мероприятия возврат средств за платные билеты не производится, за исключением случаев, предусмотренных законодательством РК.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "0.08em",
                color: "var(--c-cyan, #00E5FF)",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              5. Правила поведения
            </h2>
            <p>
              Участник обязуется соблюдать общественный порядок, правила безопасности и инструкции персонала Мероприятия. Запрещается проносить на территорию оружие, взрывчатые вещества, алкоголь (если иное не предусмотрено зонами Мероприятия), наркотические и психотропные вещества.
            </p>
            <p style={{ marginTop: "12px" }}>
              Организатор вправе отказать в допуске или удалить с территории Мероприятия любого Участника, нарушающего правила или создающего угрозу безопасности других посетителей.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "0.08em",
                color: "var(--c-cyan, #00E5FF)",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              6. Фото- и видеосъёмка
            </h2>
            <p>
              Участвуя в Мероприятии, Участник даёт согласие на использование его изображения (фото, видео) в материалах Организатора, включая репортажи, рекламу и публикации в социальных сетях, без дополнительного согласования и вознаграждения.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "0.08em",
                color: "var(--c-cyan, #00E5FF)",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              7. Обработка персональных данных
            </h2>
            <p>
              Регистрируясь на Мероприятие, Участник соглашается на обработку своих персональных данных (ФИО, контактные данные, e-mail и др.) в целях организации и проведения Мероприятия, а также информирования о будущих событиях Организатора. Обработка осуществляется в соответствии с Законом РК «О персональных данных».
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "0.08em",
                color: "var(--c-cyan, #00E5FF)",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              8. Ответственность
            </h2>
            <p>
              Организатор не несёт ответственности за ущерб, причинённый Участнику в результате его собственных действий, действий третьих лиц или форс-мажорных обстоятельств. Участник самостоятельно несёт ответственность за сохранность личных вещей.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "0.08em",
                color: "var(--c-cyan, #00E5FF)",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              9. Заключительные положения
            </h2>
            <p>
              Оферта вступает в силу с момента её размещения на сайте и действует до окончания Мероприятия. Организатор вправе вносить изменения в Оферту. Актуальная версия всегда доступна на официальном сайте.
            </p>
            <p style={{ marginTop: "12px" }}>
              По всем вопросам, связанным с Мероприятием и условиями Оферты, Участник может обратиться к Организатору через контакты, указанные на официальном сайте GAMEHUB.
            </p>
          </section>

          <p
            style={{
              marginTop: "40px",
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Дата публикации: 2026 г. · Алматы, Республика Казахстан
          </p>
        </div>
      </div>
    </div>
  );
}
