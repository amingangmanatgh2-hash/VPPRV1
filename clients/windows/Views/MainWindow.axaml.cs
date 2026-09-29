using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;
using VPPRV1.ViewModels;

namespace VPPRV1.Views;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        DataContext = new MainViewModel();
    }

    private void InitializeComponent()
    {
        AvaloniaXamlLoader.Load(this);
    }
}
