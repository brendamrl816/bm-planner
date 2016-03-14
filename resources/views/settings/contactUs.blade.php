@extends('shared.master')

@section('name', 'Contact Us')

@section('content')

<div style="width:100%; min-width:500px">   
   <div ng-style="style.navBar()" style="position:absolute; top:0; left:0; height:100px; width:100%; min-width:550px">
            @include('shared.navbar')
    </div>

    <div style="position:relative; width:100%;  min-width:500px; margin-top:140px">   
        <form ng-style="style.addModalStyle()" style="width:60%; height:60%; min-height:300px; margin-left:20%" id="emailForm" action="/send" method="post">
            <br>
                {!! csrf_field() !!}
                
                @foreach ($errors->all() as $error)
                    <p  class="mainError">!{{ $error}}</p>
                @endforeach
                
                @if (session('status'))
                    <div ng-style="style.statusStyle()">
                        <div style="margin:5px">{{ session('status') }}</div>
                        
                    </div>
                    <br>
                @endif
                
            <div style="margin-left:8%">     
                
                <input ng-style="style.inputStyle()" style="width:80%; height:2%; margin-top:2%" type="text" placeholder="Subject" id="subject" name="subject" value="{{ old('subject') }}">
                <textarea ng-style="style.inputStyle()" style="margin-top:2%; width:80%; height:50%" placeholder="Message Content" id="content" name="content">{{{Input::old('content')}}}</textarea>
                <br>
                <button ng-style="style.buttonStyle()" style="margin-top:15px" type="submit">Send Email</button>
            </div>
                
        </form>   
     </div>
</div>

@endsection