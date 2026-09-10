export const registry = {
  eyebrow: "Gifts",
  title: "Your being there is the gift.",
  body: "If you would like to give something, we are saving for a long table of our own and a trip up the coast.",
  /** Amount chips, in the local currency. */
  currency: "R",
  amounts: [500, 1000, 2500],
  otherLabel: "Other",
  otherPlaceholder: "Any amount",
  messageLabel: "A message for the two of us",
  give: "Give",
  /**
   * Optional payment link (SnapScan, PayFast, Yoco, PayPal.me...). If set, the
   * Give button opens it with the chosen amount appended as `?amount=`. If
   * empty, the button reveals the bank details below instead.
   */
  paymentUrl: "",
  bankToggle: "Bank details instead →",
  bank: {
    title: "Bank details",
    lines: [
      ["Account name", "P & D Wedding"],
      ["Bank", "FNB"],
      ["Account number", "00000000000"],
      ["Branch code", "250655"],
      ["Reference", "Your name"],
    ],
    copyLabel: "Copy account number",
    copiedLabel: "Copied",
  },
  illustration: { placeholder: "illustration · olive, coral, mustard\na table set for two" },
} as const;
