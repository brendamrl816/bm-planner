@extends('shared.master')

@section('name', 'Contact Us')

@section('content')
    <div>
        @include('shared.navbar')
    </div>
    <br>
    
    
    <div style="position:relative; width:80%; height:90%; margin-top:5%; margin-left:20%">
        <form id="emailForm" action="/send" method="post">
            
            @foreach ($errors->all() as $error)
                <p ng-style="style.errorStyle()">!{{ $error}}</p>
            @endforeach
            
            @if (session('status'))
                <div ng-style="style.statusStyle()">
                    <div style="margin:5px">{{ session('status') }}</div>
                    
                </div>
                <br>
            @endif
            
            {!! csrf_field() !!}
            
            <span class="boldFont">Subject:</span>
            <br>
            <input ng-style="style.modalbuttonStyle()" type="text" size="99" id="subject" name="subject" value="{{ old('subject') }}"><br><br>
            <span class="boldFont">Message:</span>
            <br>
            <textarea ng-style="style.modalbuttonStyle()" rows="15" cols="100" id="content" name="content">{{{Input::old('content')}}}</textarea><br>
            
            <button ng-style="style.buttonStyle()" style="margin-top:20px" type="submit">Send Email</button>
        </form>   
    </div>
        

@endsection