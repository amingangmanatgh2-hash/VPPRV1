namespace VPPRV1.Helpers;

public static class PersianFormatter
{
    private static readonly char[] PersianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    public static string ToPersianNumbers(this string? input)
    {
        if (string.IsNullOrEmpty(input)) return string.Empty;
        var chars = input.ToCharArray();
        for (int i = 0; i < chars.Length; i++)
        {
            if (char.IsDigit(chars[i]))
            {
                chars[i] = PersianDigits[chars[i] - '0'];
            }
        }
        return new string(chars);
    }

    public static string ToPersianNumbers(this int number) => number.ToString().ToPersianNumbers();
    public static string ToPersianNumbers(this long number) => number.ToString().ToPersianNumbers();

    public static string FormatDurationPersian(TimeSpan time)
    {
        string raw = $"{time.Hours:D2}:{time.Minutes:D2}:{time.Seconds:D2}";
        return raw.ToPersianNumbers();
    }
}
